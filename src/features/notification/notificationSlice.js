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

    getNotifSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, notifs, totalPages } = action.payload;
      notifs.forEach((noti) => {
        state.notifById[noti._id] = noti;
        // if (!state.currentPageTasks.includes(noti._id)) {
        //   state.currentPageTasks.push(noti._id);
        // }
      });
      state.currentPageNotifs = notifs.map((noti) => noti._id);
      state.totalNotifs = count;
      state.totalPages = totalPages;
    },
  },
});

export const getUserNotifications =
  ({ page, limit = NOTIF_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/notifications`, {
        params,
      });
      // if (page === 1) dispatch(slice.actions.resetProjects());

      dispatch(slice.actions.getNotifSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
