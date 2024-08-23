import { Route, Routes, Navigate } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/default/Default";
import AdminLayout from "@/layouts/admin/Admin";

// Pages
import LoginPage from "@/pages/login/Login";
import SignUpPage from "@/pages/signup/SignUp";
import ManageQuiz from "@/pages/quiz/Manage/Manage";
import CreateQuiz from "@/pages/quiz/Create/Create";
import QuizPage from "@/pages/quiz/Quiz/Quiz";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        {/* <Route path="/admin-panel" element={<div>this is the admin's page</div>} /> */}
        <Route path="/quiz/manage" element={<ManageQuiz />} />
        <Route path="/statistics" element={<div>this is the statistics page</div>} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
      </Route>
    </Routes>
  );
}

export default Router;
