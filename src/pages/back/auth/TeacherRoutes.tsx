import React from "react";
import { Route, Routes } from "react-router";
import { UserInfo } from "./userInfo";
import { Contest } from "./contest";

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/userInfo/:userId"} element={<UserInfo />} />
      <Route path={"/contest/*"} element={<Contest />} />
    </Routes>
  );
};
