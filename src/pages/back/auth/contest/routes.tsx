import React from "react";
import { Route, Routes } from "react-router";
import { ContestCreate } from "./create";
import { ContestInfo } from "./info";
import { useAuth } from "../../../../context/auth-context";
import { ListCreated } from "./list/list-created";
import { ListAll } from "./list/list-all";
import { TeacherListAllTeachContests } from "../teacher/list/list-all-teach-contests";
import { RegisterListAllRegisteredContests } from "../register/list/list-all-registered-contests";
import { GroupRoutes } from "../group/routes";
import { ProcessRoutes } from "../process/routes";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/listAll"} element={<ListAll />} />
      <Route
        path={"/register/listAllContests"}
        element={<RegisterListAllRegisteredContests />}
      />
      <Route path={"/group/*"} element={<GroupRoutes />} />
      <Route path={"/process/*"} element={<ProcessRoutes />} />
    </Routes>
  );
};

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<ContestCreate />} />
      <Route path={"/listCreated"} element={<ListCreated />} />
      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/listAll"} element={<ListAll />} />
      <Route
        path={"/teacher/listAllTeachContests"}
        element={<TeacherListAllTeachContests />}
      />
      <Route path={"/group/*"} element={<GroupRoutes />} />
      <Route path={"/process/*"} element={<ProcessRoutes />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<ContestCreate />} />
      <Route path={"/listCreated"} element={<ListCreated />} />
      <Route path={"/info/:contestId"} element={<ContestInfo />} />
      <Route path={"/listAll"} element={<ListAll />} />
      <Route
        path={"/teacher/listAllTeachContests"}
        element={<TeacherListAllTeachContests />}
      />
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
