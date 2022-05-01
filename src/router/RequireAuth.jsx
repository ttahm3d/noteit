import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  return user?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
