import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { RootState } from "../store";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  authenticated: boolean;
  state: "idle" | "loading";
}

export const sessionCheck = createAsyncThunk(
  "auth/sessionCheck",
  async (_, thunkApi) => {
    const response = await axios
      .get<User>("http://localhost:5000/api/auth/session", {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => null);
    return response;
  }
);

export const refreshUserData = createAsyncThunk(
  "auth/refreshUserData",
  async (_, thunkApi) => {
    const response = await axios
      .get<User>("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => null);
    return response;
  }
);

export const editUsername = createAsyncThunk(
  "auth/editUsername",
  async (username: string, thunkApi) => {
    const response = await axios
      .put(
        "http://localhost:5000/api/user/username",
        { value: username },
        {
          withCredentials: true,
        }
      )
      .then((_) => thunkApi.dispatch(refreshUserData()))
      .catch((err) => null);
    return null;
  }
);

export const editEmail = createAsyncThunk(
  "auth/editEmail",
  async (email: string, thunkApi) => {
    const response = await axios
      .put(
        "http://localhost:5000/api/user/email",
        { value: email },
        {
          withCredentials: true,
        }
      )
      .then((_) => thunkApi.dispatch(refreshUserData()))
      .catch((err) => null);
    return null;
  }
);

const initialState: AuthState = {
  user: null,
  authenticated: false,
  state: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sessionCheck.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(sessionCheck.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.authenticated = true;
      }
      state.state = "idle";
    });
    builder.addCase(refreshUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectAuthState = (state: RootState) => state.auth.state;

export default authSlice.reducer;
