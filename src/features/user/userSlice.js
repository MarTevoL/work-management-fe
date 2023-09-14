import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const USER_PER_PAGE = 6;

const initialState = {
  isLoading: false,
  error: null,
  userById: {},
  currentPageUser: [],
  totalUsers: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, users, totalPages } = action.payload;
      users.forEach((user) => {
        state.userById[user._id] = user;
        if (!state.currentPageUser.includes(user._id)) {
          state.currentPageUser.push(user._id);
        }
      });
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users`);

    dispatch(slice.actions.getAllUsersSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
