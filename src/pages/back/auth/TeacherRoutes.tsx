import { Route, Routes } from "react-router";
import { UserInfo } from "./userInfo";
import React from "react";

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/userInfo/:userId"} element={<UserInfo />} />
    </Routes>
  );
};
