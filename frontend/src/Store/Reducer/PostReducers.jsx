import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "../Action/PostAction";

const postSlice = createSlice({
    name: "post",
    initialState: {
      post: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(createPost.pending, (state) => {
        state.loading = true;
      })
  
      builder.addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.error = null;
      })
  
      builder.addCase(createPost.rejected, (state, action) => {
        state.loading = false;
      })
    }
  });
  
  export default  postSlice.reducer;