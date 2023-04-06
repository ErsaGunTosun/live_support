import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setAdmin(
        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);



  return (
    <div>
      <div className="wrapper">
        <div className="content-page m-0 p-0 h-100">
          <div className="content">

            <div className="navbar-custom topnav-navbar topnav-navbar-dark">
              <div className="container-fluid text-center ">

                <a href="" className="topnav-logo text-center" >
                  <span className="topnav-logo-lg text-center">
                    <p className='fs-2  fw-bold text-light m-0 p-0'>Live Support</p>
                  </span>
                  <span className="topnav-logo-sm">
                    <p className='fs-3 fw-bold text-light'>Live Support</p>
                  </span>
                </a>


                <ul className="list-unstyled topbar-menu float-end mb-0">

                  <li className="dropdown notification-list d-xl-none">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                      <i className="dripicons-search noti-icon"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                      <form className="p-3">
                        <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                      </form>
                    </div>
                  </li>

                  <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" id="topbar-languagedrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                      <img src={require('../assets/flags/us.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">English</span> <i className="mdi mdi-chevron-down align-middle"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu" aria-labelledby="topbar-languagedrop">

                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/turkey.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Turkey</span>
                      </a>

                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/russia.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                      </a>


                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/french.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">French</span>
                      </a>


                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/arabic.png')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Arabic</span>
                      </a>



                    </div>
                  </li>

                  <li className="notification-list">
                    <a className="nav-link end-bar-toggle" href="javascript: void(0);">
                      <i className="dripicons-gear noti-icon"></i>
                    </a>
                  </li>

                  <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" id="topbar-userdrop" href="#" role="button" aria-haspopup="true"
                      aria-expanded="false">
                      <span className="account-user-avatar">
                        <img src={require(`../assets/pp${admin ? admin.profil_pic : "/default.png"}`)} alt="user-image" className="rounded-circle" />
                      </span>
                      <span>
                        <span className="account-user-name">{admin ? admin.name : "Pepog"}</span>
                        <span className="account-position">{admin ? admin.status.rank : "God"}</span>
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown" aria-labelledby="topbar-userdrop">

                      <div className=" dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                      </div>


                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="mdi mdi-account-circle me-1"></i>
                        <span>My Account</span>
                      </a>


                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="mdi mdi-account-edit me-1"></i>
                        <span>Settings</span>
                      </a>

                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <i className="mdi mdi-logout me-1"></i>
                        <span>Logout</span>
                      </a>

                    </div>
                  </li>

                </ul>

              </div>
            </div>

            <div className="topnav shadow-sm">
              <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand-lg topnav-menu">

                  <div className="collapse navbar-collapse" id="topnav-menu-content">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-dashboards" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="uil-dashboard me-1"></i>Dashboards <div className="arrow-down"></div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="topnav-dashboards">
                          <a href="dashboard-analytics.html" className="dropdown-item">Analytics</a>
                          <a href="dashboard-crm.html" className="dropdown-item">CRM</a>
                          <a href="index.html" className="dropdown-item">Ecommerce</a>
                          <a href="dashboard-projects.html" className="dropdown-item">Projects</a>
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-apps" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="uil-apps me-1"></i>Apps <div className="arrow-down"></div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="topnav-apps">
                          <a href="apps-calendar.html" className="dropdown-item">Calendar</a>
                          <a href="apps-chat.html" className="dropdown-item">Chat</a>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ecommerce" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Ecommerce <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-ecommerce">
                              <a href="apps-ecommerce-products.html" className="dropdown-item">Products</a>
                              <a href="apps-ecommerce-products-details.html" className="dropdown-item">Products Details</a>
                              <a href="apps-ecommerce-orders.html" className="dropdown-item">Orders</a>
                              <a href="apps-ecommerce-orders-details.html" className="dropdown-item">Order Details</a>
                              <a href="apps-ecommerce-customers.html" className="dropdown-item">Customers</a>
                              <a href="apps-ecommerce-shopping-cart.html" className="dropdown-item">Shopping Cart</a>
                              <a href="apps-ecommerce-checkout.html" className="dropdown-item">Checkout</a>
                              <a href="apps-ecommerce-sellers.html" className="dropdown-item">Sellers</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-email" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Email <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-email">
                              <a href="apps-email-inbox.html" className="dropdown-item">Inbox</a>
                              <a href="apps-email-read.html" className="dropdown-item">Read Email</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-project" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Projects <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-project">
                              <a href="apps-projects-list.html" className="dropdown-item">List</a>
                              <a href="apps-projects-details.html" className="dropdown-item">Details</a>
                              <a href="apps-projects-gantt.html" className="dropdown-item">Gantt</a>
                              <a href="apps-projects-add.html" className="dropdown-item">Create Project</a>
                            </div>
                          </div>
                          <a href="apps-social-feed.html" className="dropdown-item">Social Feed</a>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-tasks" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Tasks <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-tasks">
                              <a href="apps-tasks.html" className="dropdown-item">List</a>
                              <a href="apps-tasks-details.html" className="dropdown-item">Details</a>
                              <a href="apps-kanban.html" className="dropdown-item">Kanban Board</a>
                            </div>
                          </div>
                          <a href="apps-file-manager.html" className="dropdown-item">File Manager</a>
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="uil-copy-alt me-1"></i>Pages <div className="arrow-down"></div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="topnav-pages">
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-auth" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Authenitication <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-auth">
                              <a href="pages-login.html" className="dropdown-item">Login</a>
                              <a href="pages-login-2.html" className="dropdown-item">Login 2</a>
                              <a href="pages-register.html" className="dropdown-item">Register</a>
                              <a href="pages-register-2.html" className="dropdown-item">Register 2</a>
                              <a href="pages-logout.html" className="dropdown-item">Logout</a>
                              <a href="pages-logout-2.html" className="dropdown-item">Logout 2</a>
                              <a href="pages-recoverpw.html" className="dropdown-item">Recover Password</a>
                              <a href="pages-recoverpw-2.html" className="dropdown-item">Recover Password 2</a>
                              <a href="pages-lock-screen.html" className="dropdown-item">Lock Screen</a>
                              <a href="pages-lock-screen-2.html" className="dropdown-item">Lock Screen 2</a>
                              <a href="pages-confirm-mail.html" className="dropdown-item">Confirm Mail</a>
                              <a href="pages-confirm-mail-2.html" className="dropdown-item">Confirm Mail 2</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-error" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Error <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-error">
                              <a href="pages-404.html" className="dropdown-item">Error 404</a>
                              <a href="pages-404-alt.html" className="dropdown-item">Error 404-alt</a>
                              <a href="pages-500.html" className="dropdown-item">Error 500</a>
                            </div>
                          </div>
                          <a href="pages-starter.html" className="dropdown-item">Starter Page</a>
                          <a href="pages-preloader.html" className="dropdown-item">With Preloader</a>
                          <a href="pages-profile.html" className="dropdown-item">Profile</a>
                          <a href="pages-profile-2.html" className="dropdown-item">Profile 2</a>
                          <a href="pages-invoice.html" className="dropdown-item">Invoice</a>
                          <a href="pages-faq.html" className="dropdown-item">FAQ</a>
                          <a href="pages-pricing.html" className="dropdown-item">Pricing</a>
                          <a href="pages-maintenance.html" className="dropdown-item">Maintenance</a>
                          <a href="pages-timeline.html" className="dropdown-item">Timeline</a>
                          <a href="landing.html" className="dropdown-item">Landing</a>
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="uil-package me-1"></i>Components <div className="arrow-down"></div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="topnav-components">
                          <a href="widgets.html" className="dropdown-item">Widgets</a>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ui-kit" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Base UI 1 <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-ui-kit">
                              <a href="ui-accordions.html" className="dropdown-item">Accordions</a>
                              <a href="ui-alerts.html" className="dropdown-item">Alerts</a>
                              <a href="ui-avatars.html" className="dropdown-item">Avatars</a>
                              <a href="ui-badges.html" className="dropdown-item">Badges</a>
                              <a href="ui-breadcrumb.html" className="dropdown-item">Breadcrumb</a>
                              <a href="ui-buttons.html" className="dropdown-item">Buttons</a>
                              <a href="ui-cards.html" className="dropdown-item">Cards</a>
                              <a href="ui-carousel.html" className="dropdown-item">Carousel</a>
                              <a href="ui-dropdowns.html" className="dropdown-item">Dropdowns</a>
                              <a href="ui-embed-video.html" className="dropdown-item">Embed Video</a>
                              <a href="ui-grid.html" className="dropdown-item">Grid</a>
                              <a href="ui-list-group.html" className="dropdown-item">List Group</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ui-kit2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Base UI 2 <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-ui-kit2">
                              <a href="ui-modals.html" className="dropdown-item">Modals</a>
                              <a href="ui-notifications.html" className="dropdown-item">Notifications</a>
                              <a href="ui-offcanvas.html" className="dropdown-item">Offcanvas</a>
                              <a href="ui-placeholders.html" className="dropdown-item">Placeholders</a>
                              <a href="ui-pagination.html" className="dropdown-item">Pagination</a>
                              <a href="ui-popovers.html" className="dropdown-item">Popovers</a>
                              <a href="ui-progress.html" className="dropdown-item">Progress</a>
                              <a href="ui-ribbons.html" className="dropdown-item">Ribbons</a>
                              <a href="ui-spinners.html" className="dropdown-item">Spinners</a>
                              <a href="ui-tabs.html" className="dropdown-item">Tabs</a>
                              <a href="ui-tooltips.html" className="dropdown-item">Tooltips</a>
                              <a href="ui-typography.html" className="dropdown-item">Typography</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-extended-ui" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Extended UI <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-extended-ui">
                              <a href="extended-dragula.html" className="dropdown-item">Dragula</a>
                              <a href="extended-range-slider.html" className="dropdown-item">Range Slider</a>
                              <a href="extended-ratings.html" className="dropdown-item">Ratings</a>
                              <a href="extended-scrollbar.html" className="dropdown-item">Scrollbar</a>
                              <a href="extended-scrollspy.html" className="dropdown-item">Scrollspy</a>
                              <a href="extended-treeview.html" className="dropdown-item">Treeview</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-charts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Charts <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-charts">
                              <div className="dropdown">
                                <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-apex-charts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Apex Charts <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="topnav-apex-charts">
                                  <a href="charts-apex-area.html" className="dropdown-item">Area</a>
                                  <a href="charts-apex-bar.html" className="dropdown-item">Bar</a>
                                  <a href="charts-apex-bubble.html" className="dropdown-item">Bubble</a>
                                  <a href="charts-apex-candlestick.html" className="dropdown-item">Candlestick</a>
                                  <a href="charts-apex-column.html" className="dropdown-item">Column</a>
                                  <a href="charts-apex-heatmap.html" className="dropdown-item">Heatmap</a>
                                  <a href="charts-apex-line.html" className="dropdown-item">Line</a>
                                  <a href="charts-apex-mixed.html" className="dropdown-item">Mixed</a>
                                  <a href="charts-apex-pie.html" className="dropdown-item">Pie</a>
                                  <a href="charts-apex-radar.html" className="dropdown-item">Radar</a>
                                  <a href="charts-apex-radialbar.html" className="dropdown-item">RadialBar</a>
                                  <a href="charts-apex-scatter.html" className="dropdown-item">Scatter</a>
                                  <a href="charts-apex-sparklines.html" className="dropdown-item">Sparklines</a>
                                </div>
                              </div>
                              <a href="charts-chartjs.html" className="dropdown-item">Chartjs</a>
                              <a href="charts-brite.html" className="dropdown-item">Britecharts</a>
                              <a href="charts-sparkline.html" className="dropdown-item">Sparklines</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-forms" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Forms <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-forms">
                              <a href="form-elements.html" className="dropdown-item">Basic Elements</a>
                              <a href="form-advanced.html" className="dropdown-item">Form Advanced</a>
                              <a href="form-validation.html" className="dropdown-item">Validation</a>
                              <a href="form-wizard.html" className="dropdown-item">Wizard</a>
                              <a href="form-fileuploads.html" className="dropdown-item">File Uploads</a>
                              <a href="form-editors.html" className="dropdown-item">Editors</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-tables" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Tables <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-tables">
                              <a href="tables-basic.html" className="dropdown-item">Basic Tables</a>
                              <a href="tables-datatable.html" className="dropdown-item">Data Tables</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-icons" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Icons <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-icons">
                              <a href="icons-dripicons.html" className="dropdown-item">Dripicons</a>
                              <a href="icons-mdi.html" className="dropdown-item">Material Design</a>
                              <a href="icons-unicons.html" className="dropdown-item">Unicons</a>
                            </div>
                          </div>
                          <div className="dropdown">
                            <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-maps" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Maps <div className="arrow-down"></div>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="topnav-maps">
                              <a href="maps-google.html" className="dropdown-item">Google Maps</a>
                              <a href="maps-vector.html" className="dropdown-item">Vector Maps</a>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-layouts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="uil-window me-1"></i>Layouts <div className="arrow-down"></div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="topnav-layouts">
                          <a href="layouts-vertical.html" className="dropdown-item">Vertical</a>
                          <a href="layouts-detached.html" className="dropdown-item">Detached</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>



            <div className="container-fluid">


              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Live Support</a></li>
                        <li className="breadcrumb-item active"><a href="javascript: void(0);">Home</a></li>
                      </ol>
                    </div>
                    <h4 className="page-title">Starter</h4>
                  </div>
                </div>
              </div>


            </div>


          </div>



          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  Coder By ErsaGun
                </div>
                <div className="col-md-6">
                  <div className="text-md-end footer-links d-none d-md-block">
                    <a href="javascript: void(0);">Report Error</a>
                    <a href="javascript: void(0);">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>


        </div>




      </div>

      <div className="end-bar">

        <div className="rightbar-title">
          <a href="javascript:void(0);" className="end-bar-toggle float-end">
            <i className="dripicons-cross noti-icon"></i>
          </a>
          <h5 className="m-0">Settings</h5>
        </div>

        <div className="rightbar-content h-100" data-simplebar>

          <div className="p-3">
            <div className="alert alert-warning" role="alert">
              <strong>Customize </strong> the overall color scheme, layout width, etc.
            </div>


            <h5 className="mt-3">Color Scheme</h5>
            <hr className="mt-1" />

            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="color-scheme-mode" value="light"
                id="light-mode-check" checked />
              <label className="form-check-label" for="light-mode-check">Light Mode</label>
            </div>

            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="color-scheme-mode" value="dark"
                id="dark-mode-check" />
              <label className="form-check-label" for="dark-mode-check">Dark Mode</label>
            </div>


            <h5 className="mt-4">Width</h5>
            <hr className="mt-1" />
            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="width" value="fluid" id="fluid-check" checked />
              <label className="form-check-label" for="fluid-check">Fluid</label>
            </div>
            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="width" value="boxed" id="boxed-check" />
              <label className="form-check-label" for="boxed-check">Boxed</label>
            </div>


            <div className="d-grid mt-4">
              <button className="btn btn-primary" id="resetBtn">Reset to Default</button>

              <a href="https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/"
                className="btn btn-danger mt-3" target="_blank"><i className="mdi mdi-basket me-1"></i> Purchase Now</a>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Home