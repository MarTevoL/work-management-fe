import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const PROJECT_PER_PAGE = 6;

const initialState = {
  isLoading: false,
  error: null,
  projectsById: {},
  currentPageProjects: [],
  totalProjects: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProject = action.payload;
      if (state.currentPageProjects.length % PROJECT_PER_PAGE === 0) {
        state.currentPageProjects.pop();
      }
      state.projectsById[newProject._id] = newProject;
      state.currentPageProjects.unshift(newProject._id);
    },
    getProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, projects, totalPages } = action.payload;
      projects.forEach((proj) => {
        state.projectsById[proj._id] = proj;
        if (!state.currentPageProjects.includes(proj._id)) {
          state.currentPageProjects.push(proj._id);
        }
      });
      state.totalProjects = count;
      state.totalPages = totalPages;
    },
    getAllProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, projects, totalPages } = action.payload;
      projects.forEach((proj) => {
        state.projectsById[proj._id] = proj;
      });
      state.currentPageProjects = projects.map((project) => project._id);
      state.totalProjects = count;
      state.totalPages = totalPages;
    },
  },
});

export const createProject =
  ({ title, description }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/projects", {
        title,
        description,
      });
      dispatch(slice.actions.createProjectSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getProjects = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/projects`);
    // if (page === 1) dispatch(slice.actions.resetProjects());

    dispatch(slice.actions.getProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllProjectsWithPagination =
  ({ page = 1, limit = PROJECT_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const params = { page: page, limit: limit };

      const response = await apiService.get(`/projects`, { params });

      dispatch(slice.actions.getAllProjectSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
