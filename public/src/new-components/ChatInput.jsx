import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

// Styles
import '../styles/chat/main.css'

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="chat-input-container d-flex justify-content-center">
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" className="text-center ">
          <IoMdSend color="red" />
        </button>
      </form>
    </div>
  );
}
