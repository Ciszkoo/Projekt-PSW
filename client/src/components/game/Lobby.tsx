import React, { useEffect } from "react";
import { useMQTT } from "../../mqttContext/MQTTProvider";
import Chat from "./Chat";
import Ingame from "./Ingame";
import RoomsList from "./RoomsList";
import StartGameButtons from "./StartGameButtons";

const Lobby = () => {
  const { chat, client, gameId, subscribe, unsubscribe, inGame } = useMQTT();
  return (
    <>
      {!inGame && (
        <div className="flex-auto px-20 py-10 flex flex-col gap-5">
          {!inGame && <StartGameButtons />}
          {/* <div className="text-3xl font-bold">Dostępne pokoje:</div> */}
          {/* <RoomsList /> */}
        </div>
      )}
      {inGame && <Ingame />}
    </>
  );
};

export default Lobby;
