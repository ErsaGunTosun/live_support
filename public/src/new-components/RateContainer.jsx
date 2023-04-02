import { React, useEffect, useState } from 'react'

// Styles
import  '../styles/chat/main.css'

function RateContainer({ currentMessageBox, socket,changeCloseTabVisible }) {
    const [rate, setRate] = useState(0);
    const [isError, setIsError] = useState(false);

    const handleRate = (e) => {
        setRate(e.target.value);
    }
    const handleRateSubmit = async() => {
        if (rate == 0) {
            setIsError(true)
            return;
        }
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("send-rate", {
            to: currentMessageBox._id,
            from: data._id,
            rate:rate,
        });
        changeCloseTabVisible();
    }
    return (
        <div className='chat-container d-flex justify-content-center align-items-center'>
            <div className="rate-box">
                <div className="rate-messages">
                    <div className="rate-header">
                        <div className="rate-header-text">
                            <h3 className="my-0">Rate</h3>
                        </div>
                    </div>
                    <div className="rate-body">
                        <div className="rate-body-text mt-2">
                            <p className="my-0 fs-6">Rate your experience with this support</p>
                            {
                                isError && <p className="my-0 fs-6 text-danger">Please select a rate</p>
                            }
                            <div className="rate-stars d-flex mb-2">
                                <div className='rate-area'>
                                    <input type="radio" id="5-star" name="rating" value="5" onClick={handleRate} /><label htmlFor="5-star" title="Amazing">5 stars</label>
                                    <input type="radio" id="4-star" name="rating" value="4" onClick={handleRate} /><label htmlFor="4-star" title="Good">4 stars</label>
                                    <input type="radio" id="3-star" name="rating" value="3" onClick={handleRate} /><label htmlFor="3-star" title="Average">3 stars</label>
                                    <input type="radio" id="2-star" name="rating" value="2" onClick={handleRate} /><label htmlFor="2-star" title="Not Good">2 stars</label>
                                    <input type="radio" id="1-star" name="rating" value="1" onClick={handleRate} /><label htmlFor="1-star" title="Bad">1 star</label>
                                </div>
                            </div>

                            <div className="rate-buttons d-flex justify-content-center">
                                <button className="btn bg-warning" onClick={changeCloseTabVisible}>Cancel</button>
                                <button className="btn bg-danger ms-2" onClick={handleRateSubmit}>Rate</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateContainer