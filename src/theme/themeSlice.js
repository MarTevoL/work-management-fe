import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  isDarkMode: false,
};

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeDarkModeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { user } = action.payload;
      state.isDarkMode = user.isDarkMode;
    },
    getDarkModeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.isDarkMode = action.payload;
    },
  },
});
export const updateDarkMode =
  ({ isDarkMode }) =>
  (dispatch) => {
    dispatch(slice.actions.getDarkModeSuccess(isDarkMode));
    console.log(isDarkMode);
  };

export const changeDarkMode =
  ({ isDarkMode }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/users/changeDarkMode", {
        isDarkMode,
      });

      dispatch(slice.actions.changeDarkModeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
