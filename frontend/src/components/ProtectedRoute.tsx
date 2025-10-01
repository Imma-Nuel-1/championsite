import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin-login" replace />
  );
};

export default ProtectedRoute;

