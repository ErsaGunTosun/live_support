import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Components
import ChatContainer from "../../new-components/ChatContainer";
import RateContainer from "../../new-components/RateContainer";

// Header Logo
import ManLogo from "../../assets/pp/man.jpg";
import WomenLogo from "../../assets/pp/women.jpg";

// API Routes
import { messageBox, host } from "../../utils/APIRoutes";

//Styles
import '../../styles/chat/main.css'

const socket = io(host);

function Chat(props) {
  const [currentMessageBox, setCurrentMessageBox] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isCloseTab, setIsCloseTab] = useState(false);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      props.connectChat();
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
      socket.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (!currentMessageBox) {
        const { data } = await axios.get(`${messageBox}/${currentUser._id}`);
        console.log(data);
        if (data.status = true && data.box) {
          console.log("1");
          if (data.user == currentUser._id) {
            console.log("2");
            setCurrentMessageBox(data.box);
            socket.emit("login-box", {
              userId: currentUser._id,
              box: data.box
            });
          }

        }
      }
    }

  }, [currentUser]);

  // change close tab visible func
  const openCloseTab = () => {
    setIsCloseTab(!isCloseTab)
  }
  
  return (
    <>

      {/* Chat Header */}
      <div className="header text-start m-0 p-0 mb-1">
        <span className="title h4 ms-2 mb-0">
          <img src={ManLogo} className="header-logo mt-3" />
          <span className='header-text h6 ms-2 fst-italic fw-bold'>Customer Service</span>
        </span>
        <div className="chat-settings text-end d-flex align-items-center me-3">
          <span onClick={openCloseTab} className="fa-solid fa-comment-slash fs-6 chat-close"></span>
        </div>
        <div className="me-3 ms-0 mt-3">
          <span onClick={props.openChat} className="fa fa-times close-button" aria-hidden="true"></span>
        </div>
      </div>

      {/* Chat Body */}
      {
        isCloseTab
          ? <RateContainer currentMessageBox={currentMessageBox} socket={socket} changeCloseTabVisible={openCloseTab} connectChat={props.connectChat} />
          : <ChatContainer currentMessageBox={currentMessageBox} socket={socket} connectChat={props.connectChat} />
      }


    </>
  )
}

export default Chat