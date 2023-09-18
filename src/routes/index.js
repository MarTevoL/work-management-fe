import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import UserProfilePage from "../pages/UserProfilePage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import ProjectPage from "../pages/ProjectPage";
import ManagerAuthRequire from "./ManagerAuthRequire";
import TaskPage from "../pages/TaskPage";
import NotificationPage from "../pages/NotificationPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import TaskDetailPage from "../pages/TaskDetailPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/task/:taskId" element={<TaskDetailPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route
          path="/project"
          element={
            <ManagerAuthRequire>
              <ProjectPage />
            </ManagerAuthRequire>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <ManagerAuthRequire>
              <ProjectDetailPage />
            </ManagerAuthRequire>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
