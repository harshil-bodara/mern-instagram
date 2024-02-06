import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../Store/Action/UserAction";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const [resetPasswordObj, setresetPasswordObj] = useState({
    email: "",
    password: "",
    cpassword: ""
  });

  const getValue = (e) => {
    resetPasswordObj[e.target.name] = e.target.value;
    setresetPasswordObj({ ...resetPasswordObj });
  };

  const resetPasswordUser = (e) => {
    e.preventDefault();
    dispatch(resetPassword(resetPasswordObj));
  }
  return (
    <>
      <div className="container mx-auto text-center border border-1 w-25 p-4 mt-5">
        <h4 className="text-center mb-3">Reset password</h4>
        <form>
          <input
            type="email"
            placeholder="Enter Your email"
            className="finput w-75 mb-3 p-1"
            onChange={getValue}
            name="email"
          />
          <input
            type="password"
            placeholder="Enter Your password"
            className="finput w-75 mb-3 p-1"
            onChange={getValue}
            name="password"
          />
          <input
            type="password"
            placeholder="Enter Your confirm password"
            className="finput w-75 mb-3 p-1"
            onChange={getValue}
            name="cpassword"
          />
          <br />
          <button className="btn btn-primary p-1" onClick={resetPasswordUser}>
            Update now
          </button>
        </form>
      </div>
    </>
  );
};
