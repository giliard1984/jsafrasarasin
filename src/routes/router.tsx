import { Route, Routes, Navigate } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/default/Default";
import AdminLayout from "@/layouts/admin/Admin";

// Pages
import LoginPage from "@/pages/login/Login";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/user" element={<div>this is the user's page</div>} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<div>this is the admin's page</div>} />
        <Route path="/admin/manage" element={<div>this is the management page</div>} />
        <Route path="/admin/statistics" element={<div>this is the statistics page</div>} />
      </Route>
    </Routes>
  );
}

export default Router;
