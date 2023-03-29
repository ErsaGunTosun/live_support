import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { messageBox, host } from "../../utils/APIRoutes";
import axios from "axios";


import "./style.css"

import ChatHeader from "../../new-components/ChatHeader";
import ChatContainer from "../../new-components/ChatContainer";
import RateContainer from "../../new-components/RateContainer";


export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [isCloseTab, setIsCloseTab] = useState(false);
    const [currentMessageBox, setCurrentMessageBox] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/register");
        } else {
            setCurrentUser(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )
            );
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(async () => {
        if (currentUser) {
            if (!currentMessageBox) {
                console.log("req box");
                const {data}  = await axios.get(`${messageBox}/${currentUser._id}`);
                console.log(data.status);
                console.log(data.box);
                if (data.status = true && data.box) {
                    if (data.user == currentUser._id) {
                        setCurrentMessageBox(data.box);
                        socket.current.emit("login-box", {
                            userId: currentUser._id,
                            box: data.box
                        });
                    }

                }
            }
        }

    }, [currentUser]);




    // Change Chat Visible func
    const openChat = () => {
        setIsOpen(!isOpen)
    }

    // change close tab visible func
    const openCloseTab = () => {
        setIsCloseTab(!isCloseTab)
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

                    <ChatHeader changeChatVisible={openChat} changeCloseTabVisible={openCloseTab} />
                    {
                        isCloseTab
                            ? <RateContainer currentMessageBox={currentMessageBox} socket={socket} changeCloseTabVisible={openCloseTab} />
                            : <ChatContainer currentMessageBox={currentMessageBox} socket={socket} />
                    }


                </div>
            </div>

        </>
    );
}
