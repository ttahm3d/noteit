import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function () {
  const { user } = useAuth();
  const location = useLocation();

  return user?.id ? (
    <Navigate to="/" state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  );
}
