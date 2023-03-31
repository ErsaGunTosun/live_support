import React, { useEffect, useState } from 'react'

// Components
import Chat from './new-pages/chat/Chat'
import Register from './new-pages/register/Register'



// Styles
import './styles/support/main.css'

function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsOpen(!isOpen)
  }

  const connectChat =()=>{
    setIsChatOpen(!isChatOpen);
  }

  
  return (
    <div className={`live-support ${!isOpen ? "enter bg-red" : "expand bg-light"}`}  >

      {/* Chat Button div */}
      <button onClick={openChat} className="support-button text-center d-block">
        <i className={`fa fa-comments ${!isOpen ? " " : "hidden"}`} aria-hidden="true" ></i>
      </button>

      {/* Chat div */}
      <div className={`support-container ${!isOpen ? " " : "enter"}`} >

        {/* Background */}
        <div className="chat-background">
          <div className="header-background"></div>
          <div className="body-background"></div>
        </div>

        {
          !isChatOpen ?
            <Register setIsChatOpen={setIsChatOpen} openChat={openChat} connectChat={connectChat} />
            :
            <Chat setIsChatOpen={setIsChatOpen} openChat={openChat} connectChat={connectChat} />

        }


      </div>
    </div>
  )
}

export default Support