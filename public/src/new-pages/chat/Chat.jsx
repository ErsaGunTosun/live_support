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
import  '../../styles/chat/main.css'

function Chat(props) {
  const [currentMessageBox, setCurrentMessageBox] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isCloseTab, setIsCloseTab] = useState(false);
  const socket = useRef();

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      // add navigate
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
        const { data } = await axios.get(`${messageBox}/${currentUser._id}`);
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

  // change close tab visible func
  const openCloseTab = () => {
    setIsCloseTab(!isCloseTab)
  }
  return (
    <>
      <div className="header text-start m-0 p-0 mb-1">
        <span className="title h4 ms-2 mb-0">
          <img src={ManLogo} className="header-logo mt-3" />
          <span className='header-text h6 ms-2 fst-italic fw-bold'>Tillidd Fullriver</span>
        </span>
        <div className="chat-settings text-end d-flex align-items-center me-3">
          <span onClick={openCloseTab} className="fa-solid fa-comment-slash fs-6 chat-close"></span>
        </div>
        <div className="me-3 ms-0 mt-3">
          <span onClick={props.openChat} className="fa fa-times close-button" aria-hidden="true"></span>
        </div>
      </div>

      {
        isCloseTab
          ? <RateContainer currentMessageBox={currentMessageBox} socket={socket} changeCloseTabVisible={openCloseTab} />
          : <ChatContainer currentMessageBox={currentMessageBox} socket={socket} connectChat={props.connectChat}/>
      }


    </>
  )
}

export default Chat