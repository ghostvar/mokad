<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import TopNav from "./components/TopNav.vue";
import Footer from "./components/Footer.vue";

import Dashboard from "./pages/Dashboard.vue";
</script>

<template>
  <div id="layout-wrapper">
    <Header />

    <TopNav />

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <Dashboard />
    <!-- end main content-->
  </div>
  <!-- END layout-wrapper -->

  <!-- Right Sidebar -->
  <Footer />
</template>

<style src="./assets/style.css" />
