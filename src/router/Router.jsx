import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "../components";

const Homepage = lazy(() => import("../pages/homepage/Homepage"));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Suspense>
  );
}
