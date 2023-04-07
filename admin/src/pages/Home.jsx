import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from '../components/Navbar';
import PagesBar from "../components/PagesBar";
import Footer from "../components/Footer";

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
    <div className="wrapper">
      <div className="content-page m-0 p-0 h-100">
        <div className="content">
          <Navbar admin={admin} />
          <PagesBar />

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


        <Footer />

      </div>
    </div>


  )
}

export default Home