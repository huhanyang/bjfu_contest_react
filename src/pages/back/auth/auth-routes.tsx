import React from "react";
import { useAuth } from "../../../context/auth-context";
import { Route, Routes } from "react-router";
import { UserRouter } from "./user/user-routes";
import { ContestRoutes } from "./contest/contest-routes";
import { ResourceRoutes } from "./resource/resource-routes";

export const AuthRoutes = () => {
  const { user } = useAuth();

  const StudentRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route path={"/resource/*"} element={<ResourceRoutes />} />
      </Routes>
    );
  };

  const TeacherRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route path={"/resource/*"} element={<ResourceRoutes />} />
      </Routes>
    );
  };

  const AdminRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route path={"/resource/*"} element={<ResourceRoutes />} />
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
