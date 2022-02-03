<script>
import { inject, onMounted, reactive } from '@vue/runtime-core'
export default {
  setup() {
    const axios = inject('axios');
    const seriesJumlah = reactive([0, 0, 0, 0, 0]);
    const series_nilai = reactive([0, 0, 0, 0, 0]);
    const series_ringkasan = reactive([{
      name: 'Banyak Matkul',
      type: 'column',
      data: []
    }, {
      name: 'Jumlah SKS',
      type: 'line',
      data: []
    }, {
      name: 'IPK',
      type: 'line',
      data: []
    }]);
    const metadata = reactive({
      prestasi_akademik: {},
      detail_informasi: {},
      transkip_nilai: []
    });
    const chartNilaiOptions = reactive({
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#0ac074', '#0084ff', '#39539E', '#fcb92c', '#ff3d60'],
        labels: ['A', 'B', 'C', 'D', 'E'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'right',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: (seriesName, opts) => {
            return seriesJumlah[opts.seriesIndex] + " Nilai " + seriesName;
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
      });
    const chartRingkasanOptions = reactive({
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'Analisis Nilai',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: [],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Jumlah Matkul (tiap semester)",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'SKS',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "SKS (tiap semester)",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'IPK',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "IPK (tiap semester)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      });

    const loading = reactive({
      status: true
    });
    const indexing = [];
    const categories = [];
    const renderSeries = (transkip) => {
      const semester = {};
      transkip.map(r => {
        switch(r.Nilai) {
          case 'A': seriesJumlah[0]++; break;
          case 'B': seriesJumlah[1]++; break;
          case 'C': seriesJumlah[2]++; break;
          case 'D': seriesJumlah[3]++; break;
          case 'E': seriesJumlah[4]++; break;
        }

        if(!semester[r.Semester]) {
          indexing.push(r.Semester);
          semester[r.Semester] = {
            jumlah_matkul: 1,
            jumlah_sks: parseInt(r.Sks),
            satuan_t: [{
              sks: parseInt(r.Sks),
              nilai: r.Nilai
            }]
          };
        } else {
          semester[r.Semester].jumlah_matkul++;
          semester[r.Semester].jumlah_sks = semester[r.Semester].jumlah_sks + parseInt(r.Sks);
          semester[r.Semester].satuan_t.push({
            sks: parseInt(r.Sks),
            nilai: r.Nilai
          });
        }
      });

      indexing.map(s => {
        categories.push((s || ' ').replace('Semester ', ''));
        let ipk = 0;
        const smt = semester[s];
        series_ringkasan[0].data.push(smt.jumlah_matkul);
        series_ringkasan[1].data.push(smt.jumlah_sks);
        smt.satuan_t.map(r => {
          switch(r.nilai) {
            case 'A': ipk += (r.sks * 4) / smt.jumlah_sks; break;
            case 'B': ipk += (r.sks * 3) / smt.jumlah_sks; break;
            case 'C': ipk += (r.sks * 2) / smt.jumlah_sks; break;
            case 'D': ipk += (r.sks * 1) / smt.jumlah_sks; break;
            case 'E': ipk += (r.sks * 0) / smt.jumlah_sks; break;
          }
        });
        series_ringkasan[2].data.push(parseFloat(ipk).toFixed(2));
      });

      chartRingkasanOptions.xaxis = {
        categories
      };

      series_nilai[0] = seriesJumlah[0] == 0 ? 0 : 100 / transkip.length * seriesJumlah[0];
      series_nilai[1] = seriesJumlah[1] == 0 ? 0 : 100 / transkip.length * seriesJumlah[1];
      series_nilai[2] = seriesJumlah[2] == 0 ? 0 : 100 / transkip.length * seriesJumlah[2];
      series_nilai[3] = seriesJumlah[3] == 0 ? 0 : 100 / transkip.length * seriesJumlah[3];
      series_nilai[4] = seriesJumlah[4] == 0 ? 0 : 100 / transkip.length * seriesJumlah[4];
    }

    const init = () => {
      loading.status = true;
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
        renderSeries(transkip_nilai);
        loading.status = false;
      }).catch(() => {});
    }

    onMounted(() => {
      init();
    });

    return {
      chartNilaiOptions,
      chartRingkasanOptions,
      metadata,
      loading,
      series_nilai,
      series_ringkasan,
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

      <div class="row" v-if="!loading.status">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h5 class="card-title">Ringkasan</h5>
                </div>
              </div>

              <div>
                <apexchart type="line" height="350" :options="chartRingkasanOptions" :series="series_ringkasan" />
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
                  <h5 class="card-title">Perbandingan Nilai</h5>
                </div>
                <div class="flex-shrink-0">
                  <select class="form-select form-select-sm mb-0 my-n1">
                    <option value="" selected="">Semua Semester</option>
                  </select>
                </div>
              </div>

              <div>
                <apexchart type="radialBar" height="390" :options="chartNilaiOptions" :series="series_nilai" />
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