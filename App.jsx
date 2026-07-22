import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import VerifyAccess from "./pages/VerifyAccess";
import NoAccess from "./pages/NoAccess";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyAccess />} />
        <Route path="/no-access" element={<NoAccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/phase/:phaseId/week/:weekId"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
