import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/APIRoutes";
import ipLocation from "iplocation";
import "./style.css"



import RegisterForm from "../../new-components/RegisterForm";
import RegisterHeader from "../../new-components/RegisterHeader";



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

  const [isOpen, setIsOpen] = useState(false);

  // Register Check
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/chat");
    }
  }, []);

  // input Data write variable
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Register Data Check func
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

  // Register Data Submit func
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
          let platform = navigator.platform;
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
          console.warn("user data send");


          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
            navigate("/chat");
          }

        })
      })

    }
  };


  // Change Chat Visible func
  const openChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={`floating-chat ${!isOpen ? "enter bg-red" : "expand bg-light"}`}  >

        {/* Chat Button div */}
        <button onClick={openChat} className="chat-button text-center d-block">
          <i className={`fa fa-comments ${!isOpen ? " " : "hidden"}`} aria-hidden="true" ></i>
        </button>

        {/* Chat div */}
        <div className={`chat ${!isOpen ? " " : "enter"}`} >

          {/* Background */}
          <div className="chat-background">
            <div className="header-background"></div>
            <div className="body-background"></div>
          </div>

          {/* Header Component */}
          <RegisterHeader changeChatVisible={openChat} />

          {/* Registger Component */}
          <RegisterForm changeInput={handleChange} submitFunc={handleSubmit} />

        </div>
      </div>

    </>
  );
}
