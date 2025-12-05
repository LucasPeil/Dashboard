import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (user && !user._id) {
    dispatch(logout());
  }
  if (user && user.resetPassword) {
    return <Navigate to="/resetPassword" />;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
