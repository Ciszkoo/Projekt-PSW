import { Children } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { sessionCheck } from "./reducers/authReducer";
import { getThreads } from "./reducers/threadsReducer";
import ForumRoute from "./routes/ForumRoute";
import HomeRoute from "./routes/HomeRoute";
import MainRoute from "./routes/MainRoute";
import ProfileRoute from "./routes/ProfileRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { store } from "./store";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    loader: () => {
      store.dispatch(sessionCheck());
      return null;
    },
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomeRoute />,
      },
      {
        path: "/profile",
        element: <ProfileRoute />,
      },
      {
        path: "/forum",
        element: <ForumRoute />,
        loader: () => {
          store.dispatch(getThreads(1));
          return null;
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
