import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import { selectAuthenticated } from "../reducers/authReducer";
import { useAppSelector } from "../reducers/hooks";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
