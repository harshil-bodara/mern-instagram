import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../Store/Action/UserAction";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [forgotPasswordObj, setforgotPasswordObj] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const getValue = async (e) => {
    forgotPasswordObj[e.target.name] = e.target.value;
    setforgotPasswordObj({ ...forgotPasswordObj });
  };

  const forgotPasswordUser = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(forgotPasswordObj));
    navigate("/login");
  };

  return (
    <>
      <div className="container mx-auto text-center border border-1 w-25 p-4 mt-5">
        <h4 className="text-center mb-3">Forgot password</h4>
        <form>
          <input
            type="email"
            placeholder="Enter Your email"
            className="finput w-75 mb-3 p-1"
            onChange={getValue}
            name="email"
          />
          <br />
          <button className="btn btn-primary p-1" onClick={forgotPasswordUser}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
