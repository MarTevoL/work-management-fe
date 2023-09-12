import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  commentsByTask: {},
  commentsById: {},
  totalCommentsByTask: {},
  currentPageByTask: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
});

export default slice.reducer;
