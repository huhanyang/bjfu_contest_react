import { Route, Routes } from "react-router";
import React from "react";
import { ContestCreate } from "./create";
import { ContestInfo } from "./info";

export const Contest = () => {
  return (
    <>
      <Routes>
        <Route path={"/create"} element={<ContestCreate />} />
        <Route path={"/contestInfo/:contestId"} element={<ContestInfo />} />
      </Routes>
    </>
  );
};
