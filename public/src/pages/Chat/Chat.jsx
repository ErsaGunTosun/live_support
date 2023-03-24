import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { messageBox, host } from "../../utils/APIRoutes";
import axios from "axios";


import "./style.css"

import ChatHeader from "../../new-components/ChatHeader";
import ChatContainer from "../../new-components/ChatContainer";


export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [isOpen, setIsOpen] = useState(false);
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
        if(currentUser){
            if (!currentMessageBox) {
                console.log("req box");
                const {data} = await axios.get(`${messageBox}/${currentUser._id}`);
                if (data.status = true && data.box[0]) {
                    if(data.user == currentUser._id){
                        setCurrentMessageBox(data.box[0]);
                        socket.current.emit("login-box",{
                            userId:currentUser._id,
                            box:data.box[0]
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

                    <ChatHeader changeChatVisible={openChat} />
                    <ChatContainer currentMessageBox={currentMessageBox}/>

                </div>
            </div>

        </>
    );
}
