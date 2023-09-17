import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const NOTIF_PER_PAGE = 6;

const initialState = {
  isLoading: false,
  error: null,
  notifById: {},
  currentPageNotifs: [],
  totalNotifs: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const getUserTasks =
  ({ userId, page, limit = NOTIF_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/notifications`, {
        params,
      });
      // if (page === 1) dispatch(slice.actions.resetProjects());

      dispatch(slice.actions.getTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
