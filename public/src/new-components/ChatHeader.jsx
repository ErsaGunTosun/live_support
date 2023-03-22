import React from 'react'
import ManLogo from "../assets/pp/man.jpg";
import WomenLogo from "../assets/pp/women.jpg";

function ChatHeader(props) {
    return (
        <div className="header text-start">
            <span className="title h4 ms-2">
                <img src={WomenLogo} className="header-logo mt-3" />
                <span className='header-text h6 ms-2 fst-italic fw-bold'>Tillidd Fullriver</span>
            </span>

            <div onClick={props.changeChatVisible} className="me-3 ms-0 close-button mt-3">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default ChatHeader