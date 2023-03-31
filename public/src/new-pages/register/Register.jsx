import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ipLocation from "iplocation";
import axios from "axios";

//API Routes
import { registerRoute } from "../../utils/APIRoutes";

//Style
import '../../styles/register/main.css';

function Register(props) {
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
            props.connectChat();
        }
    }, []);

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
                        props.connectChat();
                    }

                })
            })

        }
    };

    return (
        <>

            <div className="header text-center mt-3 mb-1">
                <span className="title h4">
                    Welcome To Live Support
                </span>

                <div onClick={props.openChat} className="me-3 ms-0 close-button">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>

            <form className="support-form pt-3" autoComplete="off" onSubmit={(event) => handleSubmit(event)}>

                <div className="mb-2">
                    <label htmlFor="inputName" className="form-label mb-0">Name & Surname</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="name" name="name" onChange={(e) => handleChange(e)} />
                </div>

                <div className="mb-2">
                    <label htmlFor="inputEmail" className="form-label mb-0">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="email" name="email" onChange={(e) => handleChange(e)} />
                </div>

                <div className="mb-2">
                    <label htmlFor="inputPhoneNumber" className="form-label mb-0">Phone Number</label>
                    <input type="text" className="form-control" id="inputPhoneNumber" aria-describedby="phone_number" name="phone_number" onChange={(e) => handleChange(e)} />
                </div>

                <div className="text-center mt-5">
                    <button type="submit" id="start-btn" className="btn start-btn">Start</button>
                    <div id="start-btn" className="form-text">Our conversations are recorded</div>
                </div>

            </form>

        </>
    )
}

export default Register