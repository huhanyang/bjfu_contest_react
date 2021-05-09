import { Route, Routes } from "react-router";
import React from "react";
import { ContestCreate } from "./create";
import { ContestInfo } from "./info";
import { useAuth } from "../../../../context/auth-context";
import { ListCreated } from "./list/list-created";
import { ListAll } from "./list/list-all";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<ContestCreate />} />
      <Route path={"/listCreated"} element={<ListCreated />} />
      <Route path={"/contestInfo/:contestId"} element={<ContestInfo />} />
      <Route path={"/listAll"} element={<ListAll />} />
    </Routes>
  );
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/contestInfo/:contestId"} element={<ContestInfo />} />
      <Route path={"/listAll"} element={<ListAll />} />
    </Routes>
  );
};

export const Contest = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
    </>
  );
};
