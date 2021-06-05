import React from "react";
import { useAuth } from "../../../context/auth-context";
import { Route, Routes } from "react-router";
import { UserRouter } from "./user/router";
import { ContestRoutes } from "./contest/routes";
import { ResourceListAll } from "./resource/list/list-all";

export const AuthRoutes = () => {
  const { user } = useAuth();

  const StudentRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route
          path={"/resource/list/:type/:targetId"}
          element={<ResourceListAll />}
        />
      </Routes>
    );
  };

  const TeacherRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route
          path={"/resource/list/:type/:targetId"}
          element={<ResourceListAll />}
        />
      </Routes>
    );
  };

  const AdminRoutes = () => {
    return (
      <Routes>
        <Route path={"/user/*"} element={<UserRouter />} />
        <Route path={"/contest/*"} element={<ContestRoutes />} />
        <Route
          path={"/resource/list/:type/:targetId"}
          element={<ResourceListAll />}
        />
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
