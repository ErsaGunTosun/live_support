import React from 'react'

function Navbar({admin}) {
  return (
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

                  <li className="dropdown notification-list topbar-dropdown d-block">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" id="topbar-languagedrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                      <img src={require('../assets/flags/us.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">English</span> <i className="mdi mdi-chevron-down align-middle"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu" aria-labelledby="topbar-languagedrop">

                      <a href="" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/turkey.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Turkey</span>
                      </a>

                      <a href="" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/russia.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                      </a>


                      <a href="" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/french.jpg')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">French</span>
                      </a>


                      <a href="" className="dropdown-item notify-item">
                        <img src={require('../assets/flags/arabic.png')} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Arabic</span>
                      </a>
                    </div>

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


                      <a href="" className="dropdown-item notify-item">
                        <i className="mdi mdi-account-circle me-1"></i>
                        <span>My Account</span>
                      </a>


                      <a href="" className="dropdown-item notify-item">
                        <i className="mdi mdi-account-edit me-1"></i>
                        <span>Settings</span>
                      </a>

                      <a href="" className="dropdown-item notify-item">
                        <i className="mdi mdi-logout me-1"></i>
                        <span>Logout</span>
                      </a>

                    </div>
                  </li>

                </ul>

              </div>
            </div>
  )
}

export default Navbar