import React from "react";
import { useAuth } from "../../../../context/auth-context";
import { Route, Routes } from "react-router";
import { ProcessInfo } from "./info";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:processId"} element={<ProcessInfo />} />
    </Routes>
  );
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:processId"} element={<ProcessInfo />} />
    </Routes>
  );
};

export const Process = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
    </>
  );
};
