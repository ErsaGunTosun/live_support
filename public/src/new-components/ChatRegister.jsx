import React from 'react'

function ChatRegister(props) {
  return (
    <form className="chat-form" autoComplete="off">

      <div className="mb-2">
        <label htmlFor="inputName" className="form-label mb-0">Name & Surname</label>
        <input type="text" className="form-control" id="inputName" aria-describedby="name" name="name" onChange={(e) =>props.changeInput(e)} />
      </div>

      <div className="mb-2">
        <label htmlFor="inputEmail" className="form-label mb-0">Email address</label>
        <input type="email" className="form-control" id="inputEmail" aria-describedby="email" name="email" onChange={(e) => props.changeInput(e)} />
      </div>

      <div className="mb-2">
        <label htmlFor="inputPhoneNumber" className="form-label mb-0">Phone Number</label>
        <input type="text" className="form-control" id="inputPhoneNumber" aria-describedby="phone_number" name="phone_number" onChange={(e) => props.changeInput(e)} />
      </div>

      <div className="text-center mt-5">
        <button type="button" id="start-btn" className="btn start-btn">Start</button>
        <div id="start-btn" className="form-text">Our conversations are recorded</div>
      </div>

    </form>
  )
}

export default ChatRegister