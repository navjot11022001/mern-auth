/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PATH_CONTANTS from "../routes/pathContants";

const ProtectedRoutes: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state?.user);
  return currentUser ? <Outlet /> : <Navigate to={PATH_CONTANTS.SIGNIN} />;
};

export default ProtectedRoutes;
