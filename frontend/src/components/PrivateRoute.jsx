import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AppContext";

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();
  let location = useLocation();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
