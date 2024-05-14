import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "firebase/auth";
import useAuth from "../custom-hooks/useAuth";

const ProtectedRouteAdmin = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteAdmin;
