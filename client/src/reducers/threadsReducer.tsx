import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { RootState } from "../store";

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  upvotes: number;
  downvotes: number;
  rate: "upvoted" | "downvoted" | null;
}

interface ThreadsResponse {
  threads: Thread[];
  threadsCount: number;
}

interface ThreadsState {
  page: number;
  currrentThreads: Thread[];
  nextThreads: Thread[];
  threadsCount: number;
  status: "idle" | "loading";
}

export const getThreads = createAsyncThunk(
  "threads/getThreads",
  async (page: number, thunkApi) => {
    try {
      const response = await axios
        .get<ThreadsResponse>(`http://localhost:5000/api/thread/${page}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      await thunkApi.dispatch(getNextThreads(page + 1));
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getNextThreads = createAsyncThunk(
  "threads/getNextThreads",
  async (page: number, thunkApi) => {
    try {
      const response = await axios
        .get<ThreadsResponse>(`http://localhost:5000/api/thread/${page}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleNextPage = createAsyncThunk(
  "threads/handleNextPage",
  async (page: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const threads = state.threads.nextThreads;
    await thunkApi.dispatch(getNextThreads(page + 1));
    return threads;
  }
);

const initialState: ThreadsState = {
  page: 0,
  currrentThreads: [],
  nextThreads: [],
  threadsCount: 0,
  status: "idle",
};

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getThreads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getThreads.fulfilled, (state, action) => {
      if (action.payload) {
        state.currrentThreads = action.payload.threads;
      }
      state.status = "idle";
    });
    builder.addCase(getNextThreads.fulfilled, (state, action) => {
      if (action.payload) {
        state.threadsCount = action.payload.threadsCount;
        state.nextThreads = action.payload.threads;
      }
    });
    builder.addCase(handleNextPage.fulfilled, (state, action) => {
      state.currrentThreads = action.payload;
    });
  },
});

export const selectThreads = (state: RootState) => state.threads;

export const selectPage = (state: RootState) => state.threads.page;

export const { setPage } = threadsSlice.actions;

export default threadsSlice.reducer;
