import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import threadsReducer from "./reducers/threadsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
