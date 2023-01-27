import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";
import { selectAuthenticated, selectAuthState } from "../reducers/authReducer";
import { useAppSelector } from "../reducers/hooks";

export const MainRoute = () => {
  const loading = useAppSelector(selectAuthState);
  const isAuthenticated = useAppSelector(selectAuthenticated);

  return (
    <div className="flex justify-center items-center h-screen gap-5">
      {loading === "loading" && <div>Loading...</div>}
      {loading === "idle" && !isAuthenticated && (
        <>
          <LoginForm />
          <div className="h-1/3 border border-solid border-stone-500"></div>
          <RegisterForm />
        </>
      )}
      {loading === "idle" && isAuthenticated && <Navigate to="/home" replace />}
    </div>
  );
};

export default MainRoute;
