import React from "react";
import { Route, Routes } from "react-router";
import { ContestCreate } from "./contest-create";
import { useAuth } from "../../../../context/auth-context";
import { GroupRoutes } from "../group/group-routes";
import { ProcessRoutes } from "../process/process-routes";
import { ContestInfo } from "./contest-info";
import { ContestList } from "../../../../components/contest/contest-list";
import { ContestListCreated } from "../../../../components/contest/contest-list-created";
import { ContestListRegistered } from "../../../../components/contest/contest-list-registered";
import { ContestListTaught } from "../../../../components/contest/contest-list-taught";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/list"} element={<ContestList />} />
      <Route path={"/listRegistered"} element={<ContestListRegistered />} />

      <Route path={"/group/*"} element={<GroupRoutes />} />
      <Route path={"/process/*"} element={<ProcessRoutes />} />
    </Routes>
  );
};

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<ContestCreate />} />

      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/list"} element={<ContestList />} />
      <Route path={"/listCreated"} element={<ContestListCreated />} />
      <Route path={"/listTaught"} element={<ContestListTaught />} />

      <Route path={"/group/*"} element={<GroupRoutes />} />
      <Route path={"/process/*"} element={<ProcessRoutes />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<ContestCreate />} />

      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/list"} element={<ContestList />} />
      <Route path={"/listCreated"} element={<ContestListCreated />} />

      <Route path={"/group/*"} element={<GroupRoutes />} />
      <Route path={"/process/*"} element={<ProcessRoutes />} />
    </Routes>
  );
};

export const ContestRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
      {user?.type === "ADMIN" ? <AdminRoutes /> : <></>}
    </>
  );
};
