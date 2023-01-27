import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { selectAuthenticated } from "../reducers/authReducer";
import { useAppSelector } from "../reducers/hooks";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
