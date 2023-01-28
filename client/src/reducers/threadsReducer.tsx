import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { RootState } from "../store";

interface Thread {
  id: string;
  title: string;
  author: string;
  date: string;
  upvotes: number;
  downvotes: number;
  rate: "upvoted" | "downvoted" | null;
}

interface ThreadsState {
  page: number;
  currrentThreads: Thread[];
  nextThreads: Thread[];
  status: "idle" | "loading";
}

export const getThreads = createAsyncThunk(
  "threads/getThreads",
  async (page: number, thunkApi) => {
    const response = await axios
      .get<Thread[]>(`http://localhost:5000/api/thread/${page}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => null);
    thunkApi.dispatch(getNextThreads(page + 1));
    return response;
  }
);

export const getNextThreads = createAsyncThunk(
  "threads/getNextThreads",
  async (page: number, thunkApi) => {
    const response = await axios
      .get<Thread[]>(`http://localhost:5000/api/thread/${page}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => null);
    return response;
  }
);

export const nextPage = createAsyncThunk(
  "threads/nextPage",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const page = state.threads.page;
    const nextThreads = state.threads.nextThreads;
    await thunkApi.dispatch(getThreads(page + 1));
    return nextThreads;
  }
);

const initialState: ThreadsState = {
  page: 1,
  currrentThreads: [],
  nextThreads: [],
  status: "idle",
};

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nextPage.fulfilled, (state, action) => {
      state.currrentThreads = action.payload;
    });
    builder.addCase(getThreads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getThreads.fulfilled, (state, action) => {
      state.currrentThreads = action.payload as Thread[];
      state.status = "idle";
    });
  },
});

export const selectThreads = (state: RootState) => state.threads;

export default threadsSlice.reducer;
