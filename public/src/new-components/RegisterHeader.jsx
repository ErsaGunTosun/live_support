import React from 'react'

function RegisterHeader(props) {
  return (
    <div className="header text-center mt-2">
    <span className="title h4">
      Welcome To Live Support
    </span>

    <div onClick={props.changeChatVisible} className="me-3 ms-0 close-button">
      <i className="fa fa-times" aria-hidden="true"></i>
    </div>
  </div>
  )
}

export default RegisterHeader