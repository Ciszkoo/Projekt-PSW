import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useResolvedPath } from "react-router-dom";
import Lobby from "../components/game/Lobby";
import Rooms from "../components/game/RoomsList";
import { useMQTT } from "../mqttContext/MQTTProvider";
import { selectUser } from "../reducers/authReducer";
import { selectGame, setGame } from "../reducers/gameReducer";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";

interface Room {
  id: string;
  name: string;
  owner: string;
  white: string;
  black: string;
  whiteName: string;
  blackName: string;
}

const HomeRoute = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const { inGame } = useMQTT();

  return <Lobby />;
};

export default HomeRoute;
