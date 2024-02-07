import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUsers = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/register`, userData)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUsers = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        loginData
      );
      const response = await request.data.user;
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forgotPassword",
  async (forgotPasswordObj, { rejectWithValue }) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/forgotPassword`, forgotPasswordObj)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetPasswordObj, { rejectWithValue }) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/resetPassword`, resetPasswordObj)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



