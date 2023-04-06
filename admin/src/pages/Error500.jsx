import React from 'react'

function Error505() {
    return (
        <div>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-lg-5">
                            <div className="card">

                                <div className="card-header pt-4 pb-4 text-center bg-danger">
                                    <a href="index.html">
                                        <p className='text-light fs-1 fsw-bold fst-italic'>Live Support</p>
                                    </a>
                                </div>

                                <div className="card-body p-4">

                                    <div className="text-center">
                                        <img src={require('../assets/image/startman.png')} height="120" alt="File not found Image"/>

                                            <h1 className="text-error mt-4 text-danger">500</h1>
                                            <h4 className="text-uppercase text-danger mt-3">Internal Server Error</h4>
                                            <p className="text-muted mt-3">Why not try refreshing your page? or you can contact <a href="" className="text-muted"><b>Support</b></a></p>

                                            <a className="btn btn-danger mt-3" href="/"><i className="mdi mdi-reply"></i> Return Home</a>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>


            <footer className="footer footer-alt">
                Coder by ErsaGun
            </footer>
        </div>
    )
}

export default Error505