import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/admin-signin" replace />
  );
};

export default ProtectedRoute;
