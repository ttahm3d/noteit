import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  const userData = localStorage.getItem("supabase.auth.token");

  return user?.id || userData ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}
