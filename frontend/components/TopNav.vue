<template>
  <div class="topnav">
    <div class="container-fluid">
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div class="collapse navbar-collapse" id="topnav-menu-content">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link cp">
                <i class="mdi mdi-chart-box-outline me-2"></i> Statistik
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link cp">
                <i class="mdi mdi-book-open-page-variant-outline me-2"></i> Matakuliah
              </a>
            </li>

            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle arrow-none"
                id="topnav-uielement"
                role="button"
              >
                <i class="mdi mdi-briefcase-variant-outline me-2"></i>UI
                Elements
                <div class="arrow-down"></div>
              </a>

              <div
                class="
                  dropdown-menu
                  mega-dropdown-menu
                  px-2
                  dropdown-mega-menu-xl
                "
                aria-labelledby="topnav-uielement"
              >
                <div class="row">
                  <div class="col-lg-4">
                    <div>
                      <a href="ui-alerts.html" class="dropdown-item">Alerts</a>
                      <a href="ui-badge.html" class="dropdown-item">Badge</a>
                      <a href="ui-breadcrumb.html" class="dropdown-item"
                        >Breadcrumb</a
                      >
                      <a href="ui-buttons.html" class="dropdown-item"
                        >Buttons</a
                      >
                      <a href="ui-cards.html" class="dropdown-item">Cards</a>
                      <a href="ui-carousel.html" class="dropdown-item"
                        >Carousel</a
                      >
                      <a href="ui-dropdowns.html" class="dropdown-item"
                        >Dropdowns</a
                      >
                      <a href="ui-grid.html" class="dropdown-item">Grid</a>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div>
                      <a href="ui-images.html" class="dropdown-item">Images</a>
                      <a href="ui-lightbox.html" class="dropdown-item"
                        >Lightbox</a
                      >
                      <a href="ui-modals.html" class="dropdown-item">Modals</a>
                      <a href="ui-offcanvas.html" class="dropdown-item"
                        >Offcanvas</a
                      >
                      <a href="ui-rangeslider.html" class="dropdown-item"
                        >Range Slider</a
                      >
                      <a href="ui-session-timeout.html" class="dropdown-item"
                        >Session Timeout</a
                      >
                      <a href="ui-pagination.html" class="dropdown-item"
                        >Pagination</a
                      >
                      <a href="ui-placeholders.html" class="dropdown-item"
                        >Placeholders</a
                      >
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div>
                      <a href="ui-progressbars.html" class="dropdown-item"
                        >Progress Bars</a
                      >
                      <a href="ui-sweet-alert.html" class="dropdown-item"
                        >Sweetalert 2</a
                      >
                      <a href="ui-tabs-accordions.html" class="dropdown-item"
                        >Tabs & Accordions</a
                      >
                      <a href="ui-typography.html" class="dropdown-item"
                        >Typography</a
                      >
                      <a href="ui-toasts.html" class="dropdown-item">Toasts</a>
                      <a href="ui-video.html" class="dropdown-item">Video</a>
                      <a href="ui-popover-tooltips.html" class="dropdown-item"
                        >Popovers &amp; Tooltips</a
                      >
                      <a href="ui-rating.html" class="dropdown-item">Rating</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                id="topnav-components"
                role="button"
              >
                <i class="ri-stack-line me-2"></i>Components
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-components">
                <div class="dropdown">
                  <a
                    class="dropdown-item dropdown-toggle arrow-none"
                    href="#"
                    id="topnav-form"
                    role="button"
                  >
                    Forms
                    <div class="arrow-down"></div>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="topnav-form">
                    <a href="form-elements.html" class="dropdown-item"
                      >Elements</a
                    >
                    <a href="form-validation.html" class="dropdown-item"
                      >Validation</a
                    >
                    <a href="form-advanced.html" class="dropdown-item"
                      >Advanced Plugins</a
                    >
                    <a href="form-editors.html" class="dropdown-item"
                      >Editors</a
                    >
                    <a href="form-uploads.html" class="dropdown-item"
                      >File Upload</a
                    >
                    <a href="form-xeditable.html" class="dropdown-item"
                      >Xeditable</a
                    >
                    <a href="form-wizard.html" class="dropdown-item">Wizard</a>
                    <a href="form-mask.html" class="dropdown-item">Mask</a>
                  </div>
                </div>
                <div class="dropdown">
                  <a
                    class="dropdown-item dropdown-toggle arrow-none"
                    href="#"
                    id="topnav-table"
                    role="button"
                  >
                    Tables
                    <div class="arrow-down"></div>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="topnav-table">
                    <a href="tables-basic.html" class="dropdown-item"
                      >Basic Tables</a
                    >
                    <a href="tables-datatable.html" class="dropdown-item"
                      >Data Tables</a
                    >
                    <a href="tables-responsive.html" class="dropdown-item"
                      >Responsive Table</a
                    >
                    <a href="tables-editable.html" class="dropdown-item"
                      >Editable Table</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <a
                    class="dropdown-item dropdown-toggle arrow-none"
                    href="#"
                    id="topnav-charts"
                    role="button"
                  >
                    Charts
                    <div class="arrow-down"></div>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="topnav-charts">
                    <a href="charts-apex.html" class="dropdown-item"
                      >Apex charts</a
                    >
                    <a href="charts-chartjs.html" class="dropdown-item"
                      >Chartjs</a
                    >
                    <a href="charts-flot.html" class="dropdown-item"
                      >Flot Chart</a
                    >
                    <a href="charts-knob.html" class="dropdown-item"
                      >Jquery Knob Chart</a
                    >
                    <a href="charts-sparkline.html" class="dropdown-item"
                      >Sparkline Chart</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <a
                    class="dropdown-item dropdown-toggle arrow-none"
                    href="#"
                    id="topnav-icons"
                    role="button"
                  >
                    Icons
                    <div class="arrow-down"></div>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="topnav-icons">
                    <a href="icons-remix.html" class="dropdown-item"
                      >Remix Icons</a
                    >
                    <a href="icons-materialdesign.html" class="dropdown-item"
                      >Material Design</a
                    >
                    <a href="icons-dripicons.html" class="dropdown-item"
                      >Dripicons</a
                    >
                    <a href="icons-fontawesome.html" class="dropdown-item"
                      >Font Awesome</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <a
                    class="dropdown-item dropdown-toggle arrow-none"
                    href="#"
                    id="topnav-map"
                    role="button"
                  >
                    Maps
                    <div class="arrow-down"></div>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="topnav-map">
                    <a href="maps-google.html" class="dropdown-item"
                      >Google Maps</a
                    >
                    <a href="maps-vector.html" class="dropdown-item"
                      >Vector Maps</a
                    >
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>