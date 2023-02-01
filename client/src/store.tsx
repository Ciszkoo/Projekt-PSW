import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import gameReducer from "./reducers/gameReducer";
import threadsReducer from "./reducers/threadsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
