import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers } from "../Store/Action/UserAction";
import { login } from "../Store/Reducer/RootReducers";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    let loginData = {
      email,
      password,
    };
    dispatch(loginUsers(loginData)).then((result) => {
      if (result.payload) {
        localStorage.setItem("LoginUser", JSON.stringify(result.payload.user));
        localStorage.setItem("Token", result.payload.token);
        setEmail("");
        setPassword("");
        dispatch(login());
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: "User not found",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
      }
    });
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="main border border-1 rounded-1 mx-auto text-center">
            <img
              src={require("../Images/logo.png")}
              style={{ width: "200px" }}
              className="mb-4"
            />
            <form>
              <input
                type="email"
                required
                placeholder="Enter Your email"
                className="finput w-75 mb-3 p-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
              />
              <br />
              <input
                type="password"
                required
                placeholder="Password"
                className="finput w-75 mb-3 p-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
              <br />
              <button
                className="btn btn-primary w-75 mb-3 p-1"
                onClick={loginUser}
              >
                Login
              </button>
              <h6 className="mb-2">OR</h6>
              <button type="button" className="logbtn me-4 ms-1">
                Login With <FcGoogle />
              </button>
              <button type="button" className="logbtn log">
                Login With <BsFacebook />
              </button><br /><br />
              <Link to="/forgetPassword">Forgot password?</Link>
            </form>
            <hr className="w-75 mx-auto" />
            <h6 className="mb-4">
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
