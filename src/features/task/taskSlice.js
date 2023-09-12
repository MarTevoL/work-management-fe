import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const TASK_PER_PAGE = 6;

const initialState = {
  isLoading: false,
  error: null,
  tasksById: {},
  currentPageTasks: [],
  totalTasks: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload;
      if (state.currentPageTasks.length % TASK_PER_PAGE === 0) {
        state.currentPageTasks.pop();
      }
      state.tasksById[newTask._id] = newTask;
      state.currentPageTasks.unshift(newTask._id);
    },
    getTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, tasks, totalPages } = action.payload;
      tasks.forEach((task) => {
        state.tasksById[task._id] = task;
        if (!state.currentPageTasks.includes(task._id)) {
          state.currentPageTasks.push(task._id);
        }
      });
      state.totalTasks = count;
      state.totalPages = totalPages;
    },
  },
});

export const createTask =
  ({ title, description, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/tasks", {
        title,
        description,
        projectId,
      });
      dispatch(slice.actions.createTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getTasks =
  ({ page, limit = TASK_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/tasks`, {
        params,
      });
      // if (page === 1) dispatch(slice.actions.resetProjects());

      dispatch(slice.actions.getTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
