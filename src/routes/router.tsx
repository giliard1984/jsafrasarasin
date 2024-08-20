import { Route, Routes, Navigate } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/default/Default";

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
    </Routes>
  );
}

export default Router;
