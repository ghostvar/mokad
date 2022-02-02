<script>
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import TopNav from "./components/TopNav.vue";
import Footer from "./components/Footer.vue";

import Dashboard from "./pages/Dashboard.vue";

import axios from 'axios';
import { provide, ref } from '@vue/runtime-core';

export default {
  components: { HelloWorld, Header, TopNav, Footer, Dashboard },
  setup() {
    const token = ref(localStorage.getItem('atk') || '');

    const instance = axios.create({
      baseURL: '/api',
      timeout: 60000
    });

    instance.interceptors.request.use(function (config) {
      if(token.value)
        config.headers['Authorization'] = 'Basic ' + token.value;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    const setAuth = ({ username, password }, callback) => {
      token.value = btoa(`${username}:${password}`);
      let hmm = localStorage.setItem('atk', token.value);
      callback(hmm);
    };

    const clearAuth = () => {
      localStorage.setItem('atk', '');
      token.value = '';
    };

    provide('axios', instance);
    provide('setAuth', setAuth);
    provide('clearAuth', clearAuth);

    return {
      token
    }
  }
}
</script>

<template>
  <div id="layout-wrapper">
    <Header />

    <TopNav />

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <Dashboard v-if="token" />
      <div v-else class="page-content">
        <div class="container-fluid">
          <p>Harap login terlebih dahulu</p>
        </div>
      </div>
      <!-- End Page-content -->
      <Footer />
    </div>
    <!-- end main content-->
  </div>
  <!-- END layout-wrapper -->

  <!-- Right Sidebar -->
</template>

<style src="./assets/style.css" />
