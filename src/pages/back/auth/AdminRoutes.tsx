import { Route, Routes } from "react-router";
import { UserInfo } from "./userInfo";
import React from "react";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/userInfo/:userId"} element={<UserInfo />} />
    </Routes>
  );
};
