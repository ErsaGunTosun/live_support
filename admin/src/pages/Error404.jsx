import React from 'react'

function Error404() {
  return (
    <div>
      <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xxl-4 col-lg-5">
              <div class="card">

                <div class="card-header pt-4 pb-4 text-center bg-danger">
                  <a href="index.html">
                    <p className='text-light fs-1 fw-bold fst-italic'>Live Support</p>
                  </a>
                </div>

                <div class="card-body p-4">
                  <div class="text-center">
                    <h1 class="text-error text-danger">4<i class="mdi mdi-emoticon-sad"></i>4</h1>
                    <h4 class="text-uppercase text-danger mt-3">Page Not Found</h4>
                    <p class="text-muted mt-3">It's looking like you may have taken a wrong turn. Don't worry... it
                      happens to the best of us. Here's a
                      little tip that might help you get back on track.</p>

                    <a class="btn btn-danger mt-3" href="/"><i class="mdi mdi-reply"></i> Return Home</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <footer class="footer footer-alt">
        Coder By ErsaGun
      </footer></div>
  )
}

export default Error404