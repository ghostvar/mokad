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
      this.axios.get('/scrapper/login', {
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
          <a href="index.html" class="logo logo-dark">
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

          <a href="index.html" class="logo logo-light">
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
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="ri-apps-2-line"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
            <div class="px-lg-2">
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="Github" />
                    <span>GitHub</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="bitbucket" />
                    <span>Bitbucket</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="dribbble" />
                    <span>Dribbble</span>
                  </a>
                </div>
              </div>

              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="dropbox" />
                    <span>Dropbox</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="mail_chimp" />
                    <span>Mail Chimp</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#">
                    <img src="" alt="slack" />
                    <span>Slack</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            data-toggle="fullscreen"
          >
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

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
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-notifications-dropdown"
          >
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="m-0">Notifications</h6>
                </div>
                <div class="col-auto">
                  <a href="#!" class="small"> View All</a>
                </div>
              </div>
            </div>
            <div data-simplebar style="max-height: 230px">
              <a href="" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar-xs">
                      <span
                        class="
                          avatar-title
                          bg-primary
                          rounded-circle
                          font-size-16
                        "
                      >
                        <i class="ri-shopping-cart-line"></i>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Your order is placed</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 3 min ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src=""
                      class="rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">James Lemire</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">It will seem like simplified English.</p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 1 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar-xs">
                      <span
                        class="
                          avatar-title
                          bg-success
                          rounded-circle
                          font-size-16
                        "
                      >
                        <i class="ri-checkbox-circle-line"></i>
                      </span>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Your item is shipped</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 3 min ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              <a href="" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src=""
                      class="rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Salena Layfield</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        As a skeptical Cambridge friend of mine occidental.
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 1 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="p-2 border-top">
              <div class="d-grid">
                <a
                  class="btn btn-sm btn-link font-size-14 text-center"
                  href="javascript:void(0)"
                >
                  <i class="mdi mdi-arrow-right-circle me-1"></i> View More..
                </a>
              </div>
            </div>
          </div>
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
                    v-model="form.username"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
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