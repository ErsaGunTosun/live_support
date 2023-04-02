import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import ipLocation from 'iplocation';
import axios from 'axios';


// API Routes
import { loginRoute } from "../utils/APIRoutes";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    isRemember: "",
  });
  const [isHidden, setIsHidden] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleValidation = () => {
    const {email, password } = values;
    if (email.length < 3) {
      setIsError(true);
      return false;
    } else if (password.length < 8) {
      setIsError(true);
      return false;
    }
    return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      
      const { email, password,isRemember } = values;

      await axios.get('https://ipecho.net/plain', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
        }
      }).then(async res => {

        await ipLocation(res.data).then(async locationData => {

          let ip = res.data;
          let location = locationData;
          let lang = navigator.language;
          let langs = navigator.languages;
          let platform = navigator.platform;
          let userAgent = navigator.userAgent;

          const { data } = await axios.post(loginRoute, {
            email,
            password,
            isRemember,
            ip,
            location,
            lang,
            langs,
            platform,
            userAgent
          });
          console.warn("user data send");


          if (data.status === false) {
            setIsError(true);
          }
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
            navigate('/');
          }

        })
      })

    }else{
        // input data reset will be added
    }
  };



  const togglePasswordVisiblity = () => {
    setIsHidden(!isHidden);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="authentication-bg w-100 h-100" data-layout-config='{"darkMode":true}'>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 w-100 h-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-4 col-lg-5">
              <div className="card">

                <div className="card-header pt-4 pb-4 text-center bg-danger">
                  <a href="#">
                    <span><img src="assets/images/logo.png" alt="" height="18" /></span>
                  </a>
                </div>

                <div className="card-body p-4">

                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Sign In</h4>
                    <p className={`text-danger mb-1 fw-bold ${isError?"d-block":"d-none"}`}>The email or password you entered is incorrect.</p>
                    <p className="text-muted mb-4 mt-0">Enter your email address and password to access admin panel.</p>
                  </div>

                  <form autoComplete='off' onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <label htmlFor="emailaddress" className="form-label">Email address</label>
                      <input className="form-control" type="email" name='email' id="emailaddress" required="" placeholder="Enter your email" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="mb-3">
                      <a href="#" className="text-muted float-end"><small>Forgot your password?</small></a>
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group input-group-merge">
                        <input type={isHidden ? 'password' : 'text'} id="password" className="form-control" name='password' placeholder="Enter your password" onChange={(e) => handleChange(e)} />

                        <div className="input-group-text fs-5 text-danger" data-password="false" onClick={togglePasswordVisiblity} role="button">
                          {
                            isHidden ? <i className="mdi mdi-eye-outline"></i> : <i className="mdi mdi-eye-off-outline"></i>
                          }
                        </div>

                      </div>
                    </div>

                    {/* Has no func */}
                    <div className="mb-3 mb-3">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" name='isRemember' id="checkbox-signin" onChange={(e) => handleChange(e)} />
                        <label className="form-check-label " htmlFor="checkbox-signin">Remember me</label>
                      </div>
                    </div>

                    <div className="mb-3 mb-0 text-center">
                      <button className="btn btn-danger" type="submit"> Log In </button>
                    </div>

                  </form>
                </div>
              </div>




            </div>
          </div>
        </div>

      </div>

      <footer className="footer footer-alt">
        Coder By ErsaGun
      </footer>


    </div>
  )
}

export default Login