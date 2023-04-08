import React, { useEffect, useState, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import axios from "axios";

// API Routes
import { allUsersRoute } from "../utils/APIRoutes";

//  Style
import '../styles/chat/users.css';


function ChatUsers({ currentUser, changeChat }) {
  const [users, setUsers] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);


  useEffect(() => {
    async function getData() {
      if (currentUser) {
        console.log("req")
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setUsers(data.data.users);
      }
    }
    getData();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="col-xxl col-xl-6 order-xl-1">
      <div className="card">
        <div className="card-body p-0">
          <ul className="nav nav-tabs nav-bordered">
            <li className="nav-item">
              <a href="#waiting" data-bs-toggle="tab" aria-expanded="false" className="nav-link active py-2">
                Waiting
              </a>
            </li>
            <li className="nav-item">
              <a href="#finished" data-bs-toggle="tab" aria-expanded="true" className="nav-link py-2">
                Finished
              </a>
            </li>
            <li className="nav-item">
              <a href="#all" data-bs-toggle="tab" aria-expanded="true" className="nav-link py-2">
                All
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane show active p-3" id="newpost">


              <div className="app-search">
                <form>
                  <div className="mb-2 position-relative">
                    <input type="text" className="form-control"
                      placeholder="People, groups & messages..." />
                    <span className="mdi mdi-magnify search-icon"></span>
                  </div>
                </form>
              </div>



              <div className="row">
                <div className="col">

                  <SimpleBar style={{ maxHeight: 537 + "px" }} className='users-container' >
                    {users ?
                      users.map((data, index) => {
                        return (
                          <div key={index}
                            onClick={() => changeCurrentChat(index, data)}
                            className={`d-flex align-items-start mt-1 p-2  ${index === currentSelected ? "users-item-select" : "users-item"}`} >

                            <img src={require('../assets/pp/default.png')} className="me-2 rounded-circle" height="48" alt="Brandon Smith" />
                            <div className="w-100 overflow-hidden">
                              <h5 className="mt-0 mb-0 font-14">
                                <span className="float-end text-muted font-12">4:30am</span> {/** DB add message time data */}
                                {data.user.name.toUpperCase()}
                              </h5>
                              <p className="mt-1 mb-0 text-muted font-14">
                                {/* <span className="w-25 float-end text-end"><span className="badge badge-danger-lighten">3</span></span> */}
                                <span className="w-75">{data.box.messages[data.box.messages.length - 1]?.message}</span>
                              </p>

                            </div>
                          </div>
                        )
                      }) :
                      "error"
                    }

                  </SimpleBar>






                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatUsers