import { Children } from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Thread from "./components/forum/Thread";
import { sessionCheck } from "./reducers/authReducer";
import { getThreads, handleNextPage, setPage } from "./reducers/threadsReducer";
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
    loader: async () => {
      await store.dispatch(sessionCheck());
      return null;
    },
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
        path: "/forum/:page",
        element: <ForumRoute />,
        loader: async ({ params }) => {
          if (
            !params.page ||
            parseInt(params.page, 10) < 1 ||
            isNaN(parseInt(params.page, 10))
          ) {
            store.dispatch(setPage(1));
            await store.dispatch(getThreads(1));
            return redirect("/forum/1");
          }
          const paramPage = parseInt(params.page, 10);
          const page = store.getState().threads.page;
          if (paramPage === page) {
            await store.dispatch(getThreads(paramPage));
            return null;
          }
          if (page === 0) {
            store.dispatch(setPage(paramPage));
            await store.dispatch(getThreads(paramPage));
            return null;
          }
          if (paramPage === page + 1) {
            await store.dispatch(handleNextPage(paramPage));
            store.dispatch(setPage(paramPage));
            return null;
          }

          store.dispatch(setPage(paramPage));
          await store.dispatch(getThreads(paramPage));
          return null;
        },
      },
      {
        path: "/thread/:id",
        element: <Thread />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
