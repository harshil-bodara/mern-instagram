import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFollow = createAsyncThunk(
  "follow/add",
  async (receiverId, { rejectWithValue }) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/follow/add/${receiverId}`,
          {},
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
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

export const deleteFollow = createAsyncThunk(
  "follow/delete",
  async (requestId, { rejectWithValue }) => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/follow/delete/${requestId}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("Token")}`,
            },
          }
        )
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

export const updateFollow = createAsyncThunk(
    "follow/update",
    async (requestId, { rejectWithValue }) => {
      try {
        await axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/follow/update/${requestId}`,{},
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("Token")}`,
              },
            }
          )
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
