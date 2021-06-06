import { Route, Routes } from "react-router";
import { ResourceList } from "../../../../components/resource/resource-list";

export const ResourceRoutes = () => {
  return (
    <Routes>
      <Route path="/list/:type/:targetId" element={<ResourceList />} />
    </Routes>
  );
};
