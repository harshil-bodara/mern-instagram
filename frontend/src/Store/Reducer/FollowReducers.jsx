import { createSlice } from "@reduxjs/toolkit";
import { addFollow } from "../Action/FollowAction";

const followSlice = createSlice({
  name: "follow",
  initialState: {
    follow: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFollow.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addFollow.fulfilled, (state, action) => {
      state.loading = false;
      state.follow = action.payload;
      state.error = null;
    });

    builder.addCase(addFollow.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default followSlice.reducer;
