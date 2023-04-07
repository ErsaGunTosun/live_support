import React from 'react'

function ChatContainer() {
    return (
        <div className="col-xxl-10 col-xl-12 order-xl-3">
            <div className="card">
                <div className="card-body">
                    <ul className="conversation-list" data-simplebar style={{ maxHeight: 537 + "px" }}>
                        <li className="clearfix">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-5.jpg" className="rounded" alt="Shreyu N" />
                                <i>10:00</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Shreyu N</i>
                                    <p>
                                        Hello!
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix odd">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-1.jpg" className="rounded" alt="dominic" />
                                <i>10:01</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Dominic</i>
                                    <p>
                                        Hi, How are you? What about our next meeting?
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-5.jpg" className="rounded" alt="Shreyu N" />
                                <i>10:01</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Shreyu N</i>
                                    <p>
                                        Yeah everything is fine
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix odd">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-1.jpg" className="rounded" alt="dominic" />
                                <i>10:02</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Dominic</i>
                                    <p>
                                        Wow that's great
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-5.jpg" alt="Shreyu N" className="rounded" />
                                <i>10:02</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Shreyu N</i>
                                    <p>
                                        Let's have it today if you are free
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix odd">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-1.jpg" alt="dominic" className="rounded" />
                                <i>10:03</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Dominic</i>
                                    <p>
                                        Sure thing! let me know if 2pm works for you
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-5.jpg" alt="Shreyu N" className="rounded" />
                                <i>10:04</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Shreyu N</i>
                                    <p>
                                        Sorry, I have another meeting scheduled at 2pm. Can we have it
                                        at 3pm instead?
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-5.jpg" alt="Shreyu N" className="rounded" />
                                <i>10:04</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Shreyu N</i>
                                    <p>
                                        We can also discuss about the presentation talk format if you have some extra mins
                                    </p>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                        <li className="clearfix odd">
                            <div className="chat-avatar">
                                <img src="assets/images/users/avatar-1.jpg" alt="dominic" className="rounded" />
                                <i>10:05</i>
                            </div>
                            <div className="conversation-text">
                                <div className="ctext-wrap">
                                    <i>Dominic</i>
                                    <p>
                                        3pm it is. Sure, let's discuss about presentation format, it would be great to finalize today.
                                        I am attaching the last year format and assets here...
                                    </p>
                                </div>
                                <div className="card mt-2 mb-1 shadow-none border text-start">
                                    <div className="p-2">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <div className="avatar-sm">
                                                    <span className="avatar-title rounded">
                                                        .ZIP
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col ps-0">
                                                <a href=""
                                                    className="text-muted fw-bold">Hyper-admin-design.zip</a>
                                                <p className="mb-0">2.3 MB</p>
                                            </div>
                                            <div className="col-auto">

                                                <a href=""
                                                    className="btn btn-link btn-lg text-muted">
                                                    <i className="dripicons-download"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="conversation-actions dropdown">
                                <button className="btn btn-sm btn-link" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className='uil uil-ellipsis-v'></i></button>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Copy Message</a>
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Delete</a>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="row">
                        <div className="col">
                            <div className="mt-2 bg-light p-3 rounded">
                                <form className="needs-validation" noValidate="" name="chat-form"
                                    id="chat-form">
                                    <div className="row">
                                        <div className="col mb-2 mb-sm-0">
                                            <input type="text" className="form-control border-0" placeholder="Enter your text" required="" />
                                            <div className="invalid-feedback">
                                                Please enter your messsage
                                            </div>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="btn-group">
                                                <a href="#" className="btn btn-light"><i className="uil uil-paperclip"></i></a>
                                                <a href="#" className="btn btn-light"> <i className='uil uil-smile'></i> </a>
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
        </div>
    )
}

export default ChatContainer