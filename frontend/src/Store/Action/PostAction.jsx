import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

let auth = {
    headers: {
      authorization: `bearer ${localStorage.getItem("Token")}`,
    },
  };
  
export const createPost = createAsyncThunk(
  "post/add",
  async (postData, { rejectWithValue }) => {
    try {
      console.log('auth====>',auth);
      await axios
        .post("http://localhost:5000/post/add", postData, auth)
        .then((response) => {
        //   return response.data;
        getPost()
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPost = createAsyncThunk(
    "post",
    async ({ rejectWithValue }) => {
      try {
        console.log('auth====>',auth);
        await axios
          .get("http://localhost:5000/post", auth)
          .then((response) => {
            console.log('response=============>>', response.data);
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




