import React from "react";
import { useAuth } from "../../../context/auth-context";
import { Route, Routes } from "react-router";
import { UserRouter } from "./user/router";
import { ContestRoutes } from "./contest/routes";

export const AuthRoutes = () => {
  const { user } = useAuth();

  const StudentRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
      </Routes>
    );
  };

  const TeacherRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
      </Routes>
    );
  };

  const AdminRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
      </Routes>
    );
  };

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
      {user?.type === "ADMIN" ? <AdminRoutes /> : <></>}
    </>
  );
};
