import mqtt from "mqtt";
import { generate } from "short-uuid";

interface GameLobby {
  playerId: string;
  roomId: string;
}

const black: GameLobby[] = [];
const white: GameLobby[] = [];

const options: mqtt.IClientOptions = {
  port: 1883,
  host: "localhost",
  clientId: "mqttGameScheduler",
};

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("connected to mqtt broker");
  client.subscribe("lobby/#");
});

client.on("message", (topic, message) => {
  console.log(black);
  console.log(white);
  // kolejkowanie gracza białego / "wrzucanie" grzczy do pokoju
  if (topic === "lobby/white") {
    const playerId = message.toString();

    if (black.length === 0) {
      const roomId = generate();
      const gameLobby: GameLobby = { playerId, roomId };
      white.push(gameLobby);
      return;
    }

    const blackPlayer = black.shift();
    const messageToWhite = JSON.stringify({
      room: blackPlayer?.roomId,
      color: "white",
      opponent: blackPlayer?.playerId,
    });
    const messageToBlack = JSON.stringify({
      room: blackPlayer?.roomId,
      color: "black",
      opponent: playerId,
    });
    client.publish(`${playerId}`, messageToWhite);
    client.publish(`${blackPlayer?.playerId}`, messageToBlack);
    return;
  }

  // kolejkowanie gracza czarnego / "wrzucanie" graczy do pokoju
  if (topic === "lobby/black") {
    const playerId = message.toString();

    if (white.length === 0) {
      const roomId = generate();
      const gameLobby: GameLobby = { playerId, roomId };
      black.push(gameLobby);
      return;
    }

    const whitePlayer = white.shift();
    const messageToWhite = JSON.stringify({
      room: whitePlayer?.roomId,
      color: "white",
      opponent: playerId,
    });
    const messageToBlack = JSON.stringify({
      room: whitePlayer?.roomId,
      color: "black",
      oppnent: whitePlayer?.playerId,
    });
    client.publish(`${playerId}`, messageToBlack);
    client.publish(`${whitePlayer?.playerId}`, messageToWhite);
    return;
  }

  // anulowanie kolejkowania gracza
  if (topic === "lobby/cancel") {
    const playerId = message.toString();

    const whitePlayerIndex = white.findIndex(
      (player) => player.playerId === playerId
    );
    const blackPlayerIndex = black.findIndex(
      (player) => player.playerId === playerId
    );

    if (whitePlayerIndex !== -1) {
      white.splice(whitePlayerIndex, 1);
      return;
    }

    if (blackPlayerIndex !== -1) {
      black.splice(blackPlayerIndex, 1);
      return;
    }

    return;
  }

  console.log("unknown topic");
});
