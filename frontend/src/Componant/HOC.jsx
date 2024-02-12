import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Reducer/RootReducers";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import axios from "axios";
import {
  addFollow,
  deleteFollow,
  updateFollow,
} from "../Store/Action/FollowAction";
import { FaBell } from "react-icons/fa";

export const HOC = (Componants) => {
  const Newcomponant = () => {
    const [user, setuser] = useState([]);
    const [followRequest, setfollowRequest] = useState([]);
    const [bar1, setBar1] = useState({ isHidden: true });
    const [bar2, setBar2] = useState({ isHidden: true });
    const dispatch = useDispatch();
    const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
    const logoutAccount = () => {
      dispatch(logout());
      localStorage.clear("LoginUser");
      localStorage.clear("Token");
    };

    useEffect(() => {
      getUser();
    }, []);

    const getUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/user`)
        .then((response) => {
          setuser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const showUser = () => {
      setBar1({ isHidden: !bar1.isHidden });
    };

    const showFollowing = async (id) => {
      setBar2({ isHidden: !bar2.isHidden });
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/follow/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          setfollowRequest(response.data.data.user.follower);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addFollowRequest = (receiverId) => {
      dispatch(addFollow(receiverId));
    };

    const acceptFollowRequest = (requestId) => {
      dispatch(updateFollow(requestId));
    };

    const deleteFollowRequest = (requestId) => {
      dispatch(deleteFollow(requestId));
    };

    const style1 = { visibility: bar1.isHidden ? "hidden" : "visible" };
    const style2 = { visibility: bar2.isHidden ? "hidden" : "visible" };

    return (
      <>
        <div className="d-flex">
          <div className="sidebar mt-3 ms-3 position-fixed">
            <div>
              <img
                src={require("../Images/logoWhite.png")}
                style={{ width: "180px" }}
                className="pt-3 pb-3"
              />
            </div>
            <hr className="text-white m-0" />
            <div className="mt-3">
              <NavLink to="/home">
                <div className="mb-3 ms-3 d-flex" id="sidebarDiv">
                  {" "}
                  <FaHome size={25} className="me-3" /> Home
                </div>
              </NavLink>
              <NavLink to="/post">
                <div className="mb-3 ms-3 d-flex" id="sidebarDiv">
                  {" "}
                  <MdOutlinePostAdd size={25} className="me-3" /> Post
                </div>
              </NavLink>
              <NavLink to="/profile">
                <div className="mb-3 ms-3 d-flex" id="sidebarDiv">
                  {" "}
                  <CgProfile size={25} className="me-3" /> Profile
                </div>
              </NavLink>
            </div>
          </div>

          <div className="header mt-2 ps-4 pt-1 pe-4 ms-auto">
            <div className="d-flex py-2 px-2 justify-content-between header-con">
              <div>
                <input type="text" placeholder="Search..." onClick={showUser} />
                <BiSearch size={30} />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <FaBell
                    size={25}
                    color="black"
                    onClick={() => showFollowing(loginUser.id)}
                  />
                </div>
                <div className="ms-4">
                  <Link to="/profile">
                    <CgProfile size={30} color="black" />
                  </Link>
                </div>
                <button className="btn btn-danger ms-4" onClick={logoutAccount}>
                  Logout
                </button>
              </div>
            </div>
            <div id="requestSend-div" style={style1}>
              {user.map((item, i) => {
                if (item.id !== loginUser.id) {
                  return (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${item.profile}`}
                        style={{ width: "45px", borderRadius: "50%" }}
                      />
                      <p className="ms-3 mt-3">{item.username}</p>

                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          addFollowRequest(item.id);
                          e.target.style.display = "none";
                        }}
                      >
                        Follow
                      </button>
                      {/* <button
                        className="btn btn-warning"
                        // onClick={() => addFollowRequest(item.id)}
                      >
                        Request
                      </button> */}
                    </div>
                  );
                }
              })}
            </div>
            <div id="followRequest-div" style={style2}>
              {followRequest.map((item, i) => {
                console.log('followRequest======>', followRequest.map((x) => x.follow.status));
                return (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${item.profile}`}
                      style={{ width: "45px", borderRadius: "50%" }}
                    />
                    <p className="ms-3 mt-3">{item.username}</p>
                    <div>
                      <button
                        className="btn btn-primary me-1"
                        onClick={() => acceptFollowRequest(item.follow.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteFollowRequest(item.follow.id)}
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <Componants />
            </div>
          </div>
        </div>
      </>
    );
  };
  return Newcomponant;
};
