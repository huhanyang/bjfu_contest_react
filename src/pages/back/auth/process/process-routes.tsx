import { Route, Routes } from "react-router";
import { useAuth } from "../../../../context/auth-context";
import { ProcessInfo } from "./process-info";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:processId"} element={<ProcessInfo />} />
    </Routes>
  );
};

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:processId"} element={<ProcessInfo />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:processId"} element={<ProcessInfo />} />
    </Routes>
  );
};

export const ProcessRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
      {user?.type === "ADMIN" ? <AdminRoutes /> : <></>}
    </>
  );
};
