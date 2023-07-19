import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./config/firebaseconfig";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
