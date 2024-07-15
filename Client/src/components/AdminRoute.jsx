import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element, isAdmin }) => {
  return isAdmin() ? element : <Navigate to="/login" />;
};

export default AdminRoute;
