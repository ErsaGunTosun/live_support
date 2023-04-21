import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import axios from "axios";

import { getBoxsRoute } from "../utils/APIRoutes";

function UserDetailsModal({ show, handleShow, currentChat, boxs, ipChecked, emailChecked }) {
    useEffect(() => {
        console.log(boxs);
    }, [boxs])

    return (
        <Modal show={show} onHide={handleShow} centered size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="text-start">
                        <p className='fs-4 fst-italic fw-bold'>{currentChat.user.name.toUpperCase()}</p>
                        <div className='fs-4 mt-2 mb-0 text-start text-danger'>

                            {
                                ipChecked ? <i className="fa-solid fa-location-dot"></i> : ""
                            }

                            {
                                emailChecked ? <i className={ `fa-solid fa-envelope ${ipChecked ? "mx-2":""}`} ></i> : ""
                            }

                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <hr className="" />

                    <p className="mb-1"><strong><i className='uil uil-at'></i> Email:</strong></p>
                    <p>{currentChat.user.email}</p>

                    <p className="mt-3 mb-1"><strong><i className='uil uil-phone'></i> Phone Number:</strong></p>
                    <p>{currentChat.user.phone_number}</p>

                    <p className="mt-3 mb-1"><strong><i className='uil uil-location'></i> Location:</strong></p>
                    <p>{currentChat.user.location.country.name + "," + currentChat.user.location.city}</p>

                    <p className="mt-3 mb-1"><strong><i className='uil uil-globe'></i> Languages:</strong></p>
                    <p>{currentChat.user.langs.map(elem => elem + " ")}</p>

                    <p className="mt-3 mb-2"><strong><i className='uil uil-users-alt'></i> Tags:</strong></p>
                    <p>
                        {
                            currentChat.user.tags.length > 0 ?

                                currentChat.user.tags.map((elem, index) => {
                                    <span className="badge badge-success-lighten p-1 font-14">{elem.name}</span>
                                })
                                :
                                <span className="badge badge-danger-lighten p-1 font-14">No tags</span>
                        }

                    </p>
                    <p className="mt-3 mb-2"><strong><i className='uil uil-users-alt'></i> Notes:</strong></p>
                    <p>
                        {
                            currentChat.user.notes.length > 0 ?
                                currentChat.user.notes.map((elem, index) => {
                                    <p className="mt-3 mb-1"><strong>{elem.text}</strong></p>
                                })
                                :
                                <span className="badge badge-danger-lighten p-1 font-14">No notes</span>

                        }

                    </p>

                    <div>

                    </div>
                </div>

                <div className="mt-2">
                    <hr className="" />

                    {
                        boxs.map((elem, index) => {
                            if (!elem.isActive) {
                                if (elem.messages.length > 0) {
                                    return (
                                        <div className='border-top border-1 border-secondry my-1 p-1'>
                                            <p className="mt-2 mb-1">

                                                <span className='fs-4 fw-bold'>Last Message: </span>
                                                {
                                                    elem.messages[elem.messages.length - 1]?.message.text
                                                }
                                            </p>
                                            <p className='mb-0'>
                                                <span className='fs-5 fw-bold'>Time: </span>
                                                {
                                                    " " + (elem.messages[elem.messages.length - 1]?.time != undefined ? elem.messages[elem.messages.length - 1]?.time : "No time")
                                                }
                                            </p>
                                            <div className='text-end'>
                                                <button className='btn btn-primary'>View</button>
                                            </div>

                                        </div>
                                    )
                                }
                            }

                        })
                    }



                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >

    )
}

export default UserDetailsModal