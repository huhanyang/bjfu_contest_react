import { Route, Routes } from "react-router";
import { useAuth } from "../../../../context/auth-context";
import { GroupInfo } from "./group-info";
import { GroupListJoined } from "../../../../components/group/group-list-joined";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path={"/info/:contestId/:groupId"} element={<GroupInfo />} />
      <Route path="/listJoined" element={<GroupListJoined />} />
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
