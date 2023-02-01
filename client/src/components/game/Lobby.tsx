import React from "react";
import { useMQTT } from "../../mqttContext/MQTTProvider";
import RoomsList from "./RoomsList";
import StartGameButtons from "./StartGameButtons";

const Lobby = () => {
  const { inGame } = useMQTT();


  return (
    <div className="flex-auto px-20 py-10 flex flex-col gap-5">
      <div className="self-center flex gap-5">
        {!inGame && <StartGameButtons />}
      </div>
      {/* <div className="text-3xl font-bold">Dostępne pokoje:</div> */}
      {/* <RoomsList /> */}
    </div>
  );
};

export default Lobby;
