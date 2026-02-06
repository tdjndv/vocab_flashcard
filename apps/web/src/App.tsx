import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VocabPage from "./pages/VocabPage"
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 默认进入 /signin 或 /vocab 你自己选 */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/vocab" element={<ProtectedRoute><VocabPage /></ProtectedRoute>} />
      {/* 未匹配到的路由 */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
