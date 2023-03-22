import React from 'react'

function ChatContainer({ currentMessageBox }) {
    return (
        <>


            <div className='chat-container d-flex justify-content-center align-items-center'>
                {
                    (currentMessageBox !== undefined)
                        ?
                        <form className="w-100 h-100 mx-3 mt-5" autoComplete="off" >

                            <div className="mb-2">
                                <label htmlFor="inputName" className="form-label mb-0">Name & Surname</label>
                                <input type="text" className="form-control" id="inputName" aria-describedby="name" name="name" />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="inputEmail" className="form-label mb-0">Email address</label>
                                <input type="email" className="form-control" id="inputEmail" aria-describedby="email" name="email" />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="inputPhoneNumber" className="form-label mb-0">Phone Number</label>
                                <input type="text" className="form-control" id="inputPhoneNumber" aria-describedby="phone_number" name="phone_number" />
                            </div>

                            <div className="text-center mt-5">
                                <button type="submit" id="start-btn" className="btn start-btn">Start</button>
                                <div id="start-btn" className="form-text">Our conversations are recorded</div>
                            </div>

                        </form>

                        :
                        <div className='row w-100 text-center'>
                            <div className='col-12'>
                                <p class="spinner-border text-danger m-0" >
                                    <span class="visually-hidden">Loading...</span>
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