import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if JWT exists

  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // if token exists, render the protected component
};

export default ProtectedRoute;
