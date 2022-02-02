<script>
import { inject, onMounted, reactive } from '@vue/runtime-core'
export default {
  setup() {
    const axios = inject('axios');
    const metadata = reactive({
      prestasi_akademik: {},
      detail_informasi: {},
      transkip_nilai: []
    });

    const init = () => {
      axios.get('/renderer')
      .then(res => {
        const {
          prestasi_akademik,
          detail_informasi,
          transkip_nilai
        } = res.data.data;
        metadata.prestasi_akademik = prestasi_akademik;
        metadata.detail_informasi = detail_informasi;
        metadata.transkip_nilai = transkip_nilai;
      }).catch(() => {});
    }

    onMounted(() => {
      init();
    });

    return {
      metadata
    }
  },
}
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
            class="
              page-title-box
              d-sm-flex
              align-items-center
              justify-content-between
            "
          >
            <h4 class="mb-sm-0">Statistik</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <a href="javascript: void(0);">Portal Akademik</a>
                </li>
                <li class="breadcrumb-item active">Statistik</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex text-muted">
                <div class="flex-grow-1 overflow-hidden">
                  <p class="text-success mb-1">IPK Komulatif</p>
                  <h5 class="mb-3" v-text="metadata.prestasi_akademik.IP_Kumulatif"></h5>
                  <p class="text-truncate mb-0">
                    Total Keseluruhan IPK
                  </p>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1 overflow-hidden">
                  <p class="text-success mb-1">Jumlah SKS</p>
                  <h5 class="mb-3" v-text="metadata.prestasi_akademik.Jumlah_SKS_diambil"></h5>
                  <p class="text-truncate mb-0">
                    SKS yang telah diambil
                  </p>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex text-muted">
                <div class="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-3" class="apex-charts" dir="ltr"></div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <p class="text-success mb-1">Jumlah Matakuliah</p>
                  <h5 class="mb-3" v-text="metadata.prestasi_akademik.Jumlah_mata_kuliah_diambil"></h5>
                  <p class="text-truncate mb-0">
                    Matakuliah telah diambil
                  </p>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex text-muted">
                <div class="flex-grow-1 overflow-hidden">
                  <h5 class="mb-3" v-text="metadata.detail_informasi.Program_Studi"></h5>
                  <p class="mb-1" v-text="metadata.detail_informasi.NIM"></p>
                  <p class="text-truncate text-success mb-0" v-text="metadata.detail_informasi.Nama"></p>
                </div>
                <div class="flex-shrink-0 me-3 align-self-center">
                  <div class="avatar-sm">
                    <div
                      class="
                        avatar-title
                        bg-light
                        rounded-circle
                        text-primary
                        font-size-20
                      "
                    >
                      <i class="ri-group-line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->

      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h5 class="card-title">Overview</h5>
                </div>
                <div class="flex-shrink-0">
                  <div>
                    <button type="button" class="btn btn-soft-secondary btn-sm">
                      ALL
                    </button>
                    <button type="button" class="btn btn-soft-primary btn-sm">
                      1M
                    </button>
                    <button type="button" class="btn btn-soft-secondary btn-sm">
                      6M
                    </button>
                    <button
                      type="button"
                      class="btn btn-soft-secondary btn-sm active"
                    >
                      1Y
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div id="mixed-chart" class="apex-charts" dir="ltr"></div>
              </div>
            </div>
            <!-- end card-body -->

            <div class="card-body border-top">
              <div class="text-muted text-center">
                <div class="row">
                  <div class="col-4 border-end">
                    <div>
                      <p class="mb-2">
                        <i
                          class="mdi mdi-circle font-size-12 text-primary me-1"
                        ></i>
                        Expenses
                      </p>
                      <h5 class="font-size-16 mb-0">
                        $ 8,524
                        <span class="text-success font-size-12"
                          ><i class="mdi mdi-menu-up font-size-14 me-1"></i>1.2
                          %</span
                        >
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 border-end">
                    <div>
                      <p class="mb-2">
                        <i
                          class="mdi mdi-circle font-size-12 text-light me-1"
                        ></i>
                        Maintenance
                      </p>
                      <h5 class="font-size-16 mb-0">
                        $ 8,524
                        <span class="text-success font-size-12"
                          ><i class="mdi mdi-menu-up font-size-14 me-1"></i>2.0
                          %</span
                        >
                      </h5>
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <p class="mb-2">
                        <i
                          class="mdi mdi-circle font-size-12 text-danger me-1"
                        ></i>
                        Profit
                      </p>
                      <h5 class="font-size-16 mb-0">
                        $ 8,524
                        <span class="text-success font-size-12"
                          ><i class="mdi mdi-menu-up font-size-14 me-1"></i>0.4
                          %</span
                        >
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h5 class="card-title">Social Source</h5>
                </div>
                <div class="flex-shrink-0">
                  <select class="form-select form-select-sm mb-0 my-n1">
                    <option value="MAY" selected="">May</option>
                    <option value="AP">April</option>
                    <option value="MA">March</option>
                    <option value="FE">February</option>
                    <option value="JA">January</option>
                    <option value="DE">December</option>
                  </select>
                </div>
              </div>

              <div>
                <div id="radialBar-chart" class="apex-charts" dir="ltr"></div>
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="social-source text-center mt-3">
                    <div class="avatar-xs mx-auto mb-3">
                      <span
                        class="
                          avatar-title
                          rounded-circle
                          bg-primary
                          font-size-18
                        "
                      >
                        <i class="ri ri-facebook-circle-fill text-white"></i>
                      </span>
                    </div>
                    <h5 class="font-size-15">Facebook</h5>
                    <p class="text-muted mb-0">125 sales</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="social-source text-center mt-3">
                    <div class="avatar-xs mx-auto mb-3">
                      <span
                        class="avatar-title rounded-circle bg-info font-size-18"
                      >
                        <i class="ri ri-twitter-fill text-white"></i>
                      </span>
                    </div>
                    <h5 class="font-size-15">Twitter</h5>
                    <p class="text-muted mb-0">112 sales</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="social-source text-center mt-3">
                    <div class="avatar-xs mx-auto mb-3">
                      <span
                        class="
                          avatar-title
                          rounded-circle
                          bg-danger
                          font-size-18
                        "
                      >
                        <i class="ri ri-instagram-line text-white"></i>
                      </span>
                    </div>
                    <h5 class="font-size-15">Instagram</h5>
                    <p class="text-muted mb-0">104 sales</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Transkip Nilai</h4>

              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 50px">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheckall"
                          />
                          <label
                            class="form-check-label"
                            for="customCheckall"
                          ></label>
                        </div>
                      </th>
                      <th scope="col">Kode & Mata Kuliah</th>
                      <th scope="col">Semester</th>
                      <!-- <th scope="col">Price</th> -->
                      <th scope="col">Bobot</th>
                      <!-- <th scope="col">Amount</th> -->
                      <th scope="col">Nilai</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(field, id) in metadata.transkip_nilai" :key="`transkip-${id}`">
                      <td>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            class="form-check-label"
                            for="customCheck1"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <p class="mb-1 font-size-12" v-text="`#${field.Kode}`"></p>
                        <h5 class="font-size-15 mb-0" v-text="field.Mata_Kuliah"></h5>
                      </td>
                      <td v-text="field.Semester"></td>
                      <!-- <td>$ 1,234</td> -->
                      <td>
                        <h1 class="font-size-14 mb-0" v-text="`${field.Sks} SKS`"></h1>
                      </td>
                      <!-- <td>$ 1,234</td> -->
                      <td>
                        <i
                          class="
                            mdi mdi-checkbox-blank-circle
                            text-success
                            me-1
                          "
                        ></i>
                        <span v-text="field.Nilai"></span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-sm"
                        >
                          Simulasi
                        </button>
                        <!-- <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                        >
                          Cancel
                        </button> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->

    </div>
  </div>
</template>