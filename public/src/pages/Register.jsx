import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import ipLocation from "iplocation";
import "../regiser.css"
import { Brush, Headset } from 'react-bootstrap-icons';

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { name, email, phone_number } = values;
    if (name.length < 3) {
      toast.error(
        "Name should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (phone_number.length < 8) {
      toast.error(
        "Phone Number should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { name, email, phone_number } = values;

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
              let platform =  navigator.platform;   
              let userAgent = navigator.userAgent;

              const { data } = await axios.post(registerRoute, {
                name,
                email,
                phone_number,
                ip,
                location,
                lang,
                langs,
                platform,
                userAgent
              });
        
        
              if (data.status === false) {
                toast.error(data.msg, toastOptions);
              }
              if (data.status === true) {
                localStorage.setItem(
                  process.env.REACT_APP_LOCALHOST_KEY,
                  JSON.stringify(data.user)
                );
                navigate("/");
              }

          })
      })

    }
  };

  const openChat = ()=>{
    setIsOpen(!isOpen)
  }

  return (
//     <>
//       <div className={`floating-chat ${!isOpen ? "enter": "expand"}`}  >
//           <button onClick={openChat} className="chat-button">
//           <i className={`fa fa-comments ${!isOpen ? " ": "hidden"}`} aria-hidden="true" ></i>
//           </button>
        
//     <div className={`chat ${!isOpen ? " ": "enter"}`} >
//         <div className="header">
//             <span className="title">
//                 what's on your mind?
//             </span>
//             <div onClick={openChat}>
//                 <i className="fa fa-times" aria-hidden="true"></i>
//             </div>
                         
//         </div>
//         <ul className="messages">
//             <li className="other">asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas</li>
//             <li className="other">Are we dogs??? ????</li>
//             <li className="self">no... we're human</li>
//             <li className="other">are you sure???</li>
//             <li className="self">yes.... -___-</li>
//             <li className="other">if we're not dogs.... we might be monkeys ????</li>
//             <li className="self">i hate you</li>
//             <li className="other">don't be so negative! here's a banana ????</li>
//             <li className="self">......... -___-</li>
//         </ul>
//         <div className="footer">
//             <div className="text-box" ></div>
//             <button id="sendMessage">send</button>
//         </div>
//     </div>
// </div>


      
//     </>


<>
<div className={`floating-chat ${!isOpen ? "enter": "expand"}`}  >
    <button onClick={openChat} className="chat-button">
    <i className={`fa fa-comments ${!isOpen ? " ": "hidden"}`} aria-hidden="true" ></i>
    </button>
  
<div className={`chat ${!isOpen ? " ": "enter"}`} >
  <div className="header">
      <span className="title">
          what's on your mind?
      </span>
      <div onClick={openChat}>
          <i className="fa fa-times" aria-hidden="true"></i>
      </div>

      


  </div>
  <form className="chat-form">
        <input />
        <input />
        <input />

        <button>start</button>


      </form>

</div>
</div>



</>






  );
}
