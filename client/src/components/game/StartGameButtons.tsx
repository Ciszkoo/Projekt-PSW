import React from "react";
import { useMQTT } from "../../mqttContext/MQTTProvider";
import { selectUser } from "../../reducers/authReducer";
import { useAppSelector } from "../../reducers/hooks";
import Button from "../button/Button";

const CreateGameButtons = () => {
  const { subscribe, publish, handleSetPending, handleUnsetPending, pending } =
    useMQTT();
  const user = useAppSelector(selectUser);

  const handleCreateGameWhite = () => {
    handleSetPending();
    subscribe(`${user?.username}`);
    publish("lobby/white", `${user?.username}`.toString());
  };

  const handleCreateGameBlack = () => {
    handleSetPending();
    subscribe(`${user?.username}`);
    publish("lobby/black", `${user?.username}`.toString());
  };

  const handleCancelSearch = () => {
    handleUnsetPending();
    publish("lobby/cancel", `${user?.username}`.toString());
  };

  return (
    <>
      <div className="self-center flex gap-5">
        <Button onClick={handleCreateGameWhite} disabled={pending}>
          Zagraj jako białe
        </Button>
        <Button onClick={handleCreateGameBlack} disabled={pending}>
          Zagraj jako czarne
        </Button>
      </div>
      {pending && <p>Oczekiwanie na przeciwnika...</p>}
      {pending && (
        <Button onClick={handleCancelSearch}>Anuluj szukanie rozgrywki</Button>
      )}
    </>
  );
};

export default CreateGameButtons;
