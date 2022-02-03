<script>
import { inject, reactive, ref } from 'vue';
export default {
  setup() {
    const show_setting = ref(false);
    const result = reactive({
      status: '',
      message: '',
      html: ''
    });
    const form = reactive({
      username: '',
      password: ''
    });

    return {
      show_setting,
      setAuth: inject('setAuth'),
      clearAuth: inject('clearAuth'),
      axios: inject('axios'),
      form,
      result
    }
  },
  methods: {
    test() {
      const { username, password } = this.form;
      this.axios.get('/scrapper/transkip', {
        auth: { username, password },
      })
      .then(res => {
        this.result.status = res.data.status;
        this.result.message = res.data.message;
        this.result.html = res.data.html;
      }).catch(err => {
        if(err.response && err.response.data) {
          this.result.status = err.response.data.status;
          this.result.message = err.response.data.message;
        }
      });
    },
    save(force = false) {
      if(this.result.status == 'success' || force) {
        this.setAuth(this.form, () => {
          this.show_setting = false;
        });
      }
    },
    keluar() {
      this.clearAuth();
    }
  }
}
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box text-center">
          <a class="logo logo-dark">
            <span class="logo-sm">
              <img
                src="../assets/logo.png"
                id="#logo"
                alt="logo-sm-dark"
                height="22"
              />
            </span>
            <span class="logo-lg">
              <img
                src="../assets/logo.png"
                id="#logo"
                alt="logo-dark"
                height="24"
              />
            </span>
          </a>

          <a class="logo logo-light">
            <span class="logo-sm">
              <img src="../assets/logo.png" alt="logo-sm-light" height="22" />
            </span>
            <span class="logo-lg">
              <img src="../assets/logo.png" alt="logo-light" height="24" />
            </span>
          </a>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-24 d-lg-none header-item"
          data-bs-toggle="collapse"
          data-bs-target="#topnav-menu-content"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>

        <div class="d-none d-lg-flex align-items-center">
          <h4 class="m-0">Modernized Portal Akademik</h4>
        </div>
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            id="page-header-notifications-dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="ri-notification-3-line"></i>
            <span class="noti-dot"></span>
          </button>
        </div>

        <div class="dropdown d-inline-block">
          <button
            @click="show_setting = !show_setting"
            type="button"
            class="btn header-item noti-icon right-bar-toggle waves-effect"
          >
            <i class="mdi mdi-cog"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 fade" :class="{ 'show': show_setting }"
            aria-labelledby="page-header-notifications-dropdown"
            style="
              position: absolute;
              inset: 0px 0px auto auto;
              margin: 0px;
              transform: translate(0px, 72px);
            "
            data-popper-placement="bottom-end"
          >
            <div class="p-3">
              <div class="row align-items-center">
                <h6 class="m-0">Pengaturan</h6>
              </div>
            </div>
            <div class="px-3">
              <form @submit.prevent="save">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Endpoint</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    value="https://siakad.utdi.ac.id/"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Username</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="username"
                    v-model="form.username"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    autocomplete="current-password"
                    class="form-control"
                    v-model="form.password"
                  />
                </div>
              </form>
              <p :class="{ 'text-success': result.status == 'success', 'text-danger': result.status == 'error' }" v-text="result.message"></p>
            </div>
            <div class="p-2 border-top">
              <div class="d-flex justify-content-between">
                <button class="btn btn-soft-default" @click="test()" type="button">Test</button>
                <div>
                  <button class="btn btn-soft-secondary me-2" @click="keluar()" type="button">Keluar</button>
                  <button class="btn btn-soft-success" @click="save()" @dblclick="save(true)" type="submit">Simpan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>