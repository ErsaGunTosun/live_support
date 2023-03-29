import React from 'react'
import ManLogo from "../assets/pp/man.jpg";
import WomenLogo from "../assets/pp/women.jpg";

function ChatHeader(props) {
    return (
        <div className="header text-start m-0 p-0 mb-1">
            <span className="title h4 ms-2 mb-0">
                <img src={ManLogo} className="header-logo mt-3" />
                <span className='header-text h6 ms-2 fst-italic fw-bold'>Tillidd Fullriver</span>
            </span>
            <div className="chat-settings text-end d-flex align-items-center me-3">
                <span onClick={props.changeCloseTabVisible} className="fa-solid fa-comment-slash fs-6 chat-close"></span>
            </div>
            <div  className="me-3 ms-0 mt-3">
                <span onClick={props.changeChatVisible} className="fa fa-times close-button" aria-hidden="true"></span>
            </div>
        </div>
    )
}

export default ChatHeader