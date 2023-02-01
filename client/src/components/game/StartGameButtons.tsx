import React from "react";
import { useMQTT } from "../../mqttContext/MQTTProvider";
import Button from "../button/Button";

const CreateGameButtons = () => {
  const { subscribe, publish } = useMQTT();

  

  const handleCreateGame = (color: "white" | "black") => {
    subscribe(`lobby/${color}`);
      
  }

  const testPublish = () => {
    publish("lobby/white", "szukam gry")
  }

  return (
    <>
      <Button onClick={testPublish}>Zagraj jako białe</Button>
      <Button>Zagraj jako czarne</Button>
    </>
  );
};

export default CreateGameButtons;
