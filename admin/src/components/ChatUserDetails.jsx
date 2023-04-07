import React, { useEffect, useState } from 'react'

function ChatUserDetails({ currentUser, currentChat }) {
    return (
        <div className="col-xxl-6 col-xl-6 order-xl-1 order-xxl-2">
            <div className="card">
                {
                    currentChat ? (
                        <div className="card-body">

                            <div className="mt-3 text-center">
                                <h4>{currentChat.user.name.toUpperCase()}</h4>
                                <p className="text-muted mt-2 font-14">Last Interacted: <strong>Few hours back</strong></p>
                            </div>

                            <div className="mt-3">
                                <hr className="" />

                                <p className="mt-4 mb-1"><strong><i className='uil uil-at'></i> Email:</strong></p>
                                <p>{currentChat.user.email}</p>

                                <p className="mt-3 mb-1"><strong><i className='uil uil-phone'></i> Phone Number:</strong></p>
                                <p>{currentChat.user.phone_number}</p>

                                <p className="mt-3 mb-1"><strong><i className='uil uil-location'></i> Location:</strong></p>
                                <p>{currentChat.user.location.country.name + "," + currentChat.user.location.city}</p>

                                <p className="mt-3 mb-1"><strong><i className='uil uil-globe'></i> Languages:</strong></p>
                                <p>{currentChat.user.langs.map(elem=> elem + " " )}</p>

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
                            </div>
                        </div>) : (
                        <div className="card-body text-center d-flex align-items-center justify-content-center" style={{minHeight: 537 + 'px'}}>
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>)
                }

            </div>
        </div>
    )
}

export default ChatUserDetails