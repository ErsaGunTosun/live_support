import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import ipLocation from "iplocation";

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

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Live Support</h1>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fff;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: red;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f0e8e0;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #000;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid red;
      outline: none;
    }
  }
  button {
    background-color: #000;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: red;
    }
  }
  span {
    color: #000;
    text-transform: uppercase;
    a {
      color: red;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
