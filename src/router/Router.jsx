import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "../components";

const Homepage = lazy(() => import("../pages/homepage/Homepage"));
const Archive = lazy(() => import("../pages/archive/Archive"));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Suspense>
  );
}
