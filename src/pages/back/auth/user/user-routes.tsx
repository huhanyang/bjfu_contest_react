import { Route, Routes } from "react-router";
import React from "react";
import { useAuth } from "../../../../context/auth-context";
import { UserInfo } from "./user-info";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:userId"} element={<UserInfo />} />
    </Routes>
  );
};

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:userId"} element={<UserInfo />} />
    </Routes>
  );
};

export const UserRouter = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
    </>
  );
};
