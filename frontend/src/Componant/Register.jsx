import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUsers } from "../Store/Action/UserAction";

export const Register = () => {
  const dispatch = useDispatch();
  const [registerobj, setregisterobj] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
    profile: "",
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const getValue = async (e) => {
    if (e.target.type === "file") {
      registerobj[e.target.name] = e.target.files[0];
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      registerobj[e.target.name] = e.target.value;
    }
    setregisterobj({ ...registerobj });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("email", registerobj.email);
    userData.append("fullname", registerobj.fullname);
    userData.append("username", registerobj.username);
    userData.append("password", registerobj.password);
    userData.append("profile", registerobj.profile);
    dispatch(registerUsers(userData));
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="main border border-1 rounded-1 mx-auto text-center">
            <img
              src={require("../Images/logo.png")}
              style={{ width: "200px" }}
              className="mb-4"
            />

            <div className="mb-3">
              <button type="button" className="logbtn me-4 ms-1">
                Login With <FcGoogle />
              </button>
              <button type="button" className="logbtn log">
                Login With <BsFacebook />
              </button>
            </div>
            <h6 className="mb-3">OR</h6>
            <form
            // action="user/register"
            // enctype="multipart/form-data"
            // method="post"
            >
              <input
                type="email"
                placeholder="Enter Your email"
                className="finput w-75 mb-3 p-1"
                onChange={getValue}
                name="email"
              />
              <br />
              <input
                type="text"
                placeholder="Enter Your fullname"
                className="finput w-75 mb-3 p-1"
                onChange={getValue}
                name="fullname"
              />
              <br />
              <input
                type="text"
                placeholder="Enter Your username"
                className="finput w-75 mb-3 p-1"
                onChange={getValue}
                name="username"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="finput w-75 mb-3 p-1"
                onChange={getValue}
                name="password"
              />
              <br />
              <input
                type="file"
                className="finput w-75 mb-3"
                onChange={getValue}
                name="profile"
              />
              {/* <img
                src={preview}
                className="img-thumbnail"
                alt="profilepic"
                style={{ height: "100px" }}
              /> */}
              <br />
              <button
                className="btn btn-primary w-75 mb-3 p-1"
                onClick={registerUser}
              >
                Sign up
              </button>
            </form>
            <hr className="w-75 mx-auto" />
            <h6 className="mb-4">
              Have an account? <NavLink to="/login">Login</NavLink>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
