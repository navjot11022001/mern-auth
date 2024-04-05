import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Headers from "../components/Headers";

const Layout = () => {
  return (
    <>
      <Headers />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
