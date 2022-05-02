import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "../components";
import RedirectAuth from "./RedirectAuth";
import RequireAuth from "./RequireAuth";

const Homepage = lazy(() => import("../pages/homepage/Homepage"));
const Archive = lazy(() => import("../pages/archive/Archive"));
const Notes = lazy(() => import("../pages/notes/Notes"));
const Trash = lazy(() => import("../pages/trash/Trash"));
const Login = lazy(() => import("../pages/auth/login/Login"));
const Signup = lazy(() => import("../pages/auth/signup/Signup"));

export default function Router() {
  const location = useLocation();
  console.log(location);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<RequireAuth />}>
          <Route path="/archive" element={<Archive />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
        <Route element={<RedirectAuth />}>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
