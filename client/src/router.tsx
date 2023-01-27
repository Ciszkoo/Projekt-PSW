import { createBrowserRouter } from "react-router-dom";
import { sessionCheck } from "./reducers/authReducer";
import HomeRoute from "./routes/HomeRoute";
import MainRoute from "./routes/MainRoute";
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
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeRoute />
      </ProtectedRoute>
    ),
  },
]);
