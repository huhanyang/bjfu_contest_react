import { Routes, Route } from "react-router";
import { GroupInfo } from "./info";
import { useAuth } from "../../../../context/auth-context";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:groupId"} element={<GroupInfo />} />
    </Routes>
  );
};

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:groupId"} element={<GroupInfo />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:groupId"} element={<GroupInfo />} />
    </Routes>
  );
};

export const GroupRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.type === "STUDENT" ? <StudentRoutes /> : <></>}
      {user?.type === "TEACHER" ? <TeacherRoutes /> : <></>}
      {user?.type === "ADMIN" ? <AdminRoutes /> : <></>}
    </>
  );
};
