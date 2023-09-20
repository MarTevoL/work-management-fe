import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification/notificationSlice";
import projectReducer from "../features/project/projectSlice";
import taskReducer from "../features/task/taskSlice";
import userReducer from "../features/user/userSlice";
import projectMemberReducer from "../features/projectMember/projectMemberSlice";
import themeReducer from "../theme/themeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  project: projectReducer,
  task: taskReducer,
  projectMember: projectMemberReducer,
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
