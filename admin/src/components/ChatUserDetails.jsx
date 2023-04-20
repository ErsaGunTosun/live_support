import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { checkUserRoute } from '../utils/APIRoutes'

function ChatUserDetails({ currentUser, currentChat }) {
    const [emailChecked, setEmailChecked] = useState(false)
    const [ipChecked, setIpChecked] = useState(false)
    useEffect(() => {
        const getData = async () => {
            const admin = JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
            const { data } = await axios.get(`${checkUserRoute}/${admin._id}/${currentChat.user._id}`)
            setEmailChecked(data.isFindEmail);
            setIpChecked(data.isFindIP);
        }
        getData()
    }, [currentChat])
    return (
        <div className="col-xxl-6 col-xl-6 order-xl-1 order-xxl-2">
            <div className="card">
                {
                    currentChat ? (
                        <div className="card-body">

                            <div className="mt-3 text-center">
                                <h4>{currentChat.user.name.toUpperCase()}</h4>
                                <button className='btn btn-primary text center fw-bold'>More Data</button>
                                <div className='fs-4 mt-2 mb-0 text-start text-danger'>
                                    
                                    {
                                        ipChecked ? <i className="fa-solid fa-location-dot"></i> : ""
                                    }

                                    {
                                        emailChecked ? <i className="fa-solid fa-envelope mx-2"></i> : ""
                                    }

                                </div>
                            </div>

                            <div className="mt-2">
                                <hr className="" />

                                <p className="mt-4 mb-1"><strong><i className='uil uil-at'></i> Email:</strong></p>
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
                            </div>
                        </div>) : (
                        <div className="card-body text-center d-flex align-items-center justify-content-center" style={{ minHeight: 537 + 'px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>)
                }

            </div>
        </div>
    )
}

export default ChatUserDetails