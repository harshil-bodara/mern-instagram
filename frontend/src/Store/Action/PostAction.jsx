import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/add",
  async (postData, { rejectWithValue }) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/post/add`, postData, {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          getPost();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue }) => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_BASE_URL}/post/delete/${postId}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          getPost();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPost = createAsyncThunk("post", async ({ rejectWithValue }) => {
  try {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/post`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return rejectWithValue(error);
  }
});
