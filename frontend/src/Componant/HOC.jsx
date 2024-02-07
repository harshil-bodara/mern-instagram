import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Reducer/RootReducers";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import axios from "axios";

export const HOC = (Componants) => {
  const Newcomponant = () => {
    const [user, setuser] = useState([]);
    const [bar, setBar] = useState({ isHidden: true });
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
      setBar({ isHidden: !bar.isHidden });
    };
    const style = { visibility: bar.isHidden ? 'hidden' : 'visible' };

    const getFollowUser = (id) => {
      console.log('id=====>',id);
    }

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
              <div>
                <Link to="/profile">
                  <CgProfile size={30} color="black" />
                </Link>
                <button className="btn btn-danger ms-4" onClick={logoutAccount}>
                  Logout
                </button>
              </div>
            </div>
            <div id="user-div" style={style}>
              {user.map((item, i) => {
                if (item.id !== loginUser.id) {
                  return (
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${item.profile}`}
                        style={{ width: "45px", borderRadius: "50%" }}
                      />
                      <p className="ms-3 mt-3">{item.username}</p>
                      <button className="btn btn-primary" onClick={()=>getFollowUser(item.id)}>Follow</button>
                    </div>
                  );
                }
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
