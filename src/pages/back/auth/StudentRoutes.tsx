import { Route, Routes } from "react-router";
import { UserInfo } from "./userInfo";
import React from "react";
import { Contest } from "./contest";

export const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/userInfo/:userId"} element={<UserInfo />} />
      <Route path={"/contest/*"} element={<Contest />} />
    </Routes>
  );
};
