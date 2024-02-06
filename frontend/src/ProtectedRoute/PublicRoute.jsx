import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({
  isAuthenticated,
  redirect = "/home",
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  return <Outlet />;
};

export default PublicRoute;