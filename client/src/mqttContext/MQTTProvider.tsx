import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { selectUser } from "../reducers/authReducer";
import { useAppSelector } from "../reducers/hooks";
import * as mqtt from "mqtt/dist/mqtt.min";
import { MqttClient, IClientOptions } from "mqtt";
import { selectGame } from "../reducers/gameReducer";
import { useParams } from "react-router-dom";

interface MessageOnFindGame {
  room: string;
  color: "white" | "black";
  opponent: string;
}

interface MqttContextI {
  client: MqttClient | null;
  // connect: (host: string, mqttOptions: IClientOptions) => void;
  // disconnect: () => void;
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
  chat: string[];
  inGame: boolean;
  handleSetPending: () => void;
  handleUnsetPending: () => void;
  pending: boolean;
  gameId: string | null;
  color: "white" | "black";
  turn: boolean;
  changeTurn: () => void;
}

const MQTTContext = createContext<MqttContextI>({
  client: null,
  // connect: () => {},
  // disconnect: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  publish: () => {},
  chat: [],
  inGame: false,
  handleSetPending: () => {},
  handleUnsetPending: () => {},
  pending: false,
  gameId: null,
  color: "white",
  turn: false,
  changeTurn: () => {},
});

export const useMQTT = () => useContext(MQTTContext);

const MQTTProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser);
  const [pending, setPending] = useState<boolean>(false);
  const [inGame, setInGame] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [chat, setChat] = useState<string[]>([]);
  const [gameId, setGameId] = useState<string | null>(null);
  const [turn, setTurn] = useState<boolean>(false);
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([]);
  const [color, setColor] = useState<"white" | "black">("white");

  const handleSetPending = () => {
    setPending(true);
  };

  const handleUnsetPending = () => {
    setPending(false);
  };

  useEffect(() => {
    const clientMQTT = mqtt.connect("ws://localhost", { port: 8081 });
    setClient(clientMQTT);
    clientMQTT.on("connect", () => console.log("connected"));
    clientMQTT.on("message", (topic, message, packet) => {
      if (topic === `${user?.username}`) {
        console.log("message", message.toString());
        setInGame(true);
        setPending(false);
        const messageJson: MessageOnFindGame = JSON.parse(message.toString());
        console.log(messageJson);
        setGameId(messageJson.room);
        setTurn(messageJson.color === "white");
        setColor(messageJson.color);
        // clientMQTT.subscribe(`game/${messageJson.room}/chat`);
        // subscribe(`game/${messageJson.gameId}/move`);
        return;
      }
      // if (topic === `game/${gameId}/chat`) {
      //   console.log("chatted", message.toString());
      //   setChat((prev) => [...prev, message.toString()]);
      //   return;
      // }
      // console.log("topic", topic);
      // console.log(typeof topic);
      // console.log(`game/${gameId}/chat`);
      // console.log(topic === `game/${gameId}/chat`);
      // console.log(packet);
    });

    return () => {
      clientMQTT.end();
      setClient(null);
    };
  }, []);

  const publish = (topic: string, message: string) => {
    if (client) {
      client.publish(topic, message, { qos: 2 }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  const subscribe = (topic: string) => {
    if (client && !subscribedTopics.includes(topic)) {
      client.subscribe(topic);
      setSubscribedTopics([...subscribedTopics, topic]);
    }
  };

  const unsubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic);
      setSubscribedTopics(subscribedTopics.filter((t) => t != topic));
    }
  };

  const changeTurn = () => {
    setTurn((prev) => !prev);
  };

  return (
    <MQTTContext.Provider
      value={{
        client,
        subscribe,
        unsubscribe,
        publish,
        // disconnect,
        // connect,
        // connectionStatus,
        // payload,
        chat,
        inGame,
        handleSetPending,
        handleUnsetPending,
        pending,
        gameId,
        color,
        turn,
        changeTurn,
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};

export default MQTTProvider;
