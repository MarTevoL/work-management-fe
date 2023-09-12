import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const USER_PER_PAGE = 6;

const initialState = {
  isLoading: false,
  error: null,
  memberById: {},
  currentPageMember: [],
  totalMembers: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "projectMember",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMemberSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, members, totalPages } = action.payload;
      members.forEach((member) => {
        state.memberById[member._id] = member;
        if (!state.currentPageMember.includes(member._id)) {
          state.currentPageMember.push(member._id);
        }
      });
      state.totalMembers = count;
      state.totalPages = totalPages;
    },
  },
});

export const getProjectMember =
  ({ projectId, page, limit = USER_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/members/${projectId}`, {
        params,
      });

      dispatch(slice.actions.getMemberSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
