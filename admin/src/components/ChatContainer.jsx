import React, { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react';
import axios from 'axios';
import { sendMessageBoxRoute, recieveMessageBoxRoute, acceptBoxRoute } from "../utils/APIRoutes";

function ChatContainer({ currentChat, admin, socket }) {
    const scrollRef = useRef();
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);


    useEffect(() => {
        const getMessage = async () => {
            if (currentChat) {
                const data = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
                const response = await axios.post(recieveMessageBoxRoute, {
                    from: data._id,
                    to: currentChat.box?.details[0]._id,
                });
                setMessages(response.data);

            }
            console.log(currentChat)
        };
        getMessage();
    }, [currentChat]);


    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg(" ");
        }
    };

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("send-msg", {
            to: currentChat.box.details[0]._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageBoxRoute, {
            from: data._id,
            to: currentChat.box.details[0]._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    const acceptBox = async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        const { result } = await axios.post(acceptBoxRoute, {
            admin: data._id,
            to: currentChat.box.details[0]._id,
        });
        if (result.status) {
            socket.current.emit("add-box-admin", {
                to: currentChat.box.details[0]._id,
                admin: data._id,
            });
        }
    }

    useEffect(() => {

        if (socket.current) {
            socket.current.on("msg-recieve", (data) => {
                if (admin._id == data.to) {
                    setArrivalMessage({ fromSelf: false, message: data.msg });
                }

            });
        }
    }, []);


    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    return (
        <div className="col-xxl-10 col-xl-12 order-xl-3">
            <div className="card">
                <div className="card-body">

                    {
                        currentChat ?
                            currentChat.box.details[0].adminastor ?
                                <SimpleBar ref={scrollRef} style={{ minHeight: 500 + "px",maxHeight:550 + 'px' }} className="conversation-list" >
                                    <ul className="conversation-list" style={{ maxHeight: 537 + "px" }}>
                                        {
                                            currentChat && messages.map((message, index) => {
                                                return (
                                                    <li className={message.fromSelf ? "clearfix odd" : "clearfix "} key={index}>
                                                        <div className="chat-avatar">
                                                            <img src={require('../assets/pp/default.png')} className="rounded" alt="Shreyu N" />
                                                            <i>10:00</i> {/** DB add message time data */}
                                                        </div>
                                                        <div className="conversation-text">
                                                            <div className="ctext-wrap">
                                                                <i>{currentChat.user.name.toUpperCase()}</i>
                                                                <p>
                                                                    {message.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="conversation-actions dropdown">
                                                            <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                                                aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item" href="#">Copy Message</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </SimpleBar>
                                :
                                <div style={{ minHeight: 500 + 'px' }} className='d-flex justify-content-center align-items-center'>
                                    <div className='w-100 text-center'>
                                        <p className='w-100 fs-3 fw-bold fst-italic text-primary d-block'>No admin is looking at this ticket</p>
                                        <p className='w-100 d-block d-flex justify-content-center'>
                                            <button className='d-block btn btn-success' onClick={acceptBox}>Accept help request</button>
                                        </p>
                                    </div>


                                </div>
                            :
                            <div style={{ minHeight: 500 + 'px' }} className='d-flex justify-content-center align-items-center'>
                                <div className='w-100 text-center'>
                                    <p className='w-100 fs-3 fw-bold fsts-italic text-primary d-block'>There is no selected chat</p>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>


                            </div>
                    }




                    <div className="row">
                        <div className="col">
                            <div className="mt-2 bg-light p-3 rounded">
                                <form className="needs-validation" onSubmit={(event) => sendChat(event)} name="chat-form"
                                    id="chat-form">
                                    <div className="row">
                                        <div className="col mb-2 mb-sm-0">
                                            <input onChange={(e) => setMsg(e.target.value)}
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

                </div>
            </div>
        </div >
    )
}

export default ChatContainer