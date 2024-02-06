import { createSlice } from "@reduxjs/toolkit";
import {registerUsers, loginUsers, forgetPassword, resetPassword} from "../Action/UserAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUsers.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    })

    builder.addCase(registerUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })

    builder.addCase(registerUsers.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error;
    })

    builder.addCase(loginUsers.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    })

    builder.addCase(loginUsers.fulfilled, (state, action) => { 
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })

    builder.addCase(loginUsers.rejected, (state,action) => {
      state.loading = false;
      state.user = null;
    })

    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    })

    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })

    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    })

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })

    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error;
    })
  }
});

export default  userSlice.reducer;
