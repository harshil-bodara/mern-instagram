import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Reducer/RootReducers";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";

export const HOC = (Componants) => {
  const Newcomponant = () => {
    const dispatch = useDispatch();
    const logoutAccount = () => {
      dispatch(logout());
      localStorage.clear("LoginUser");
      localStorage.clear("Token");
    };

    const showUser = () => {};

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
                <div></div>
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
