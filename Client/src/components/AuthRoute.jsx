import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthRoute = ({ element, isAuth }) => {
  if (!isAuth()) {
    toast.error("Login first before booking Train Seats");
  }
  return isAuth() ? element : <Navigate to="/login" />;
};

export default AuthRoute;
