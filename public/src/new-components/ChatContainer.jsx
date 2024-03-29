import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


// API Routes
import { sendMessageBoxRoute, recieveMessageBoxRoute } from "../utils/APIRoutes";

// Components
import ChatInput from "./ChatInput";

function ChatContainer({ currentMessageBox, socket, connectChat }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageBoxRoute, {
      from: data._id,
      to: currentMessageBox._id,
    });
    setMessages(response.data);
  }, [currentMessageBox]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentMessageBox) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentMessageBox]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.emit("send-msg", {
      to: currentMessageBox._id,
      from: data._id,
      msg,
      time: new Date().toLocaleTimeString(),
    });
    await axios.post(sendMessageBoxRoute, {
      from: data._id,
      to: currentMessageBox._id,
      message: msg,
      time: new Date().toLocaleTimeString(),
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, time: new Date().toLocaleTimeString() });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", async (data) => {
        console.log(data)
        const me = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (me._id == data.to)
          setArrivalMessage({ fromSelf: false, message: data.msg, time: data.time });


      });

      socket.on("add-rate", (box) => {
        if (box._id == currentMessageBox._id) {
          localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
          connectChat();
        }
      })
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>

      <div className='chat-container d-flex justify-content-center align-items-center'>
        {
          (currentMessageBox !== undefined)
            ?
            // Chat Container
            <div className="chat-box">
              <div className="chat-messages">
                {messages.map((message) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div
                        className={`message ${message.fromSelf ? "sended" : "recieved"
                          }`}
                      >
                        <div className="content">
                          <p className="my-0">{message.message}</p>
                          <p className="my-0 fs-6">{message.time.split(":")[0] + ":" + message.time.split(":")[1]}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Component */}
              <ChatInput handleSendMsg={handleSendMsg} />

            </div>
            :
            // Loading Container
            <div className='row w-100 text-center'>
              <div className='col-12'>
                <p className="spinner-border text-danger m-0" >
                  <span className="visually-hidden">Loading...</span>
                </p>
              </div>
              <p className='h5 fw-bold text-danger fst-italic'>Connecting To Support</p>
            </div>
        }
      </div>

    </>
  )
}


export default ChatContainer