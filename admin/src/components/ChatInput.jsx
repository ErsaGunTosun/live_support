import React,{useEffect,useState} from 'react'

function ChatInput({sendChat,setMsg,msg}) {

    return (

        <div className="row">
            <div className="col">
                <div className="mt-2 bg-light p-3 rounded">
                    <form className="needs-validation" onSubmit={(event) => sendChat(event)} name="chat-form"
                        id="chat-form">
                        <div className="row">
                            <div className="col mb-2 mb-sm-0">
                                <input onChange={(e) => setMsg(e.target.value)}
                                    value={msg}
                                    type="text" className="form-control border-0" placeholder="Enter your text" required="" />
                                <div className="invalid-feedback">
                                    Please enter your messsage
                                </div>
                            </div>
                            <div className="col-sm-auto">
                                <div className="btn-group">
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-success chat-send"><i className='uil uil-message'></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatInput