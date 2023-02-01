import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";

interface Game {
  id: string;
  name: string;
  owner: string;
  white: string | null;
  black: string | null;
  whiteName: string | null;
  blackName: string | null;
}

interface Message {
  user: string;
  message: string;
}

interface GameState {
  game: Game | null;
  chat: Message[];
}

const initialState: GameState = {
  game: null,
  chat: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      if (state.game?.id !== action.payload.id) {
        console.log("setting game");
        state.game = action.payload;
      }
    },
    resetGame: (state) => {
      state.game = null;
    },
    newMessage: (state, action: PayloadAction<Message>) => {
      state.chat.push(action.payload);
    },
  },
});

export const { setGame, newMessage, resetGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;

export const selectChat = (state: RootState) => state.game.chat;

export default gameSlice.reducer;
