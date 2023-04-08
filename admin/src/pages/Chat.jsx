import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import { allUsersRoute, host } from "../utils/APIRoutes";


import Navbar from '../components/Navbar';
import PagesBar from "../components/PagesBar";
import Footer from "../components/Footer";

import ChatUsers from '../components/ChatUsers';
import ChatContainer from '../components/ChatContainer';
import ChatUserDetails from "../components/ChatUserDetails"

import "../styles/chat/chat.css";

const socket = io(host);
function Chat() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const readStorage = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setAdmin(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    readStorage();

  }, []);

  useEffect(() => {
    if (admin) {
      socket.emit("add-user", admin._id);
    }
  }, [admin]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="wrapper chat-container">
      <div className="content-page m-0 py-0 px-0">
        <div className="content ">
          <Navbar admin={admin} />
          <PagesBar />

          <div className="container-fluid ">


            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="/">Live Support</a></li>
                      <li className="breadcrumb-item"><a href="/">Apps</a></li>
                      <li className="breadcrumb-item active">Chat</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Chat</h4>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">

              <ChatUsers currentUser={admin} changeChat={handleChatChange} />
              <ChatContainer admin={admin}  socket={socket} currentChat={currentChat} />
              <ChatUserDetails   currentUser={admin} currentChat={currentChat}/>
            </div>
          </div>

        </div>

        <Footer />

      </div>
    </div >
  )
}

export default Chat