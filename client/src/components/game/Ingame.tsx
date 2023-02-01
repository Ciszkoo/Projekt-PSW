import { Chess, Move } from "chess.js";
import React, { useEffect, useState } from "react";
import { useMQTT } from "../../mqttContext/MQTTProvider";
import Board from "./Board";
import Chat from "./Chat";

export interface ChatMessage {
  user: string;
  message: string;
}

const Ingame = () => {
  const {
    chat,
    client,
    gameId,
    subscribe,
    unsubscribe,
    inGame,
    changeTurn,
    turn,
    color,
  } = useMQTT();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [game, setGame] = useState<Chess>(new Chess());

  const handleSetGame = (game: Chess) => {
    setGame(game);
  };

  useEffect(() => {
    if (client?.connected) {
      subscribe(`game/${gameId}/chat`);
      subscribe(`game/${gameId}/move`);

      client?.on("disconnect", () => {
        unsubscribe(`game/${gameId}/chat`);
        unsubscribe(`game/${gameId}/move`);
      });
      client?.on("message", (topic, message) => {
        if (topic === `game/${gameId}/chat`) {
          const msg = JSON.parse(message.toString()) as ChatMessage;
          setMessages((prev) => [...prev, msg]);
          return;
        }
        if (topic === `game/${gameId}/move`) {
          const move = JSON.parse(message.toString()) as Move;
          game.move(move);
          setGame(game);
          changeTurn();
          return;
        }
      });
    }

    return () => {
      if (client?.connected) {
        // unsubscribe(`game/${gameId}/move`);
        // unsubscribe(`game/${gameId}/chat`);
        client?.removeAllListeners();
      }
    };
  }, []);

  return (
    <div className="flex-auto flex p-5 gap-5">
      <Board game={game} setGame={handleSetGame} />
      <Chat chat={messages} />
    </div>
  );
};

export default Ingame;
