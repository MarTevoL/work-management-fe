import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
import notificationReducer from "../features/notification/notificationSlice";
import projectReducer from "../features/project/projectSlice";
import taskReducer from "../features/task/taskSlice";
import userReducer from "../features/user/userSlice";
import projectMemberReducer from "../features/projectMember/projectMemberSlice";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  project: projectReducer,
  task: taskReducer,
  comment: commentReducer,
  projectMember: projectMemberReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
