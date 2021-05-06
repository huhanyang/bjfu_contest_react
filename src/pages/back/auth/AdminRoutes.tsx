import { Route, Routes } from "react-router";
import { UserInfo } from "./userInfo";
import React from "react";
import { ContestInfo } from "./contest/info";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/userInfo/:userId"} element={<UserInfo />} />
      <Route path={"/contestInfo/:contestId"} element={<ContestInfo />} />
    </Routes>
  );
};
