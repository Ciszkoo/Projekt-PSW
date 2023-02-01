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

interface MqttContextI {
  client: MqttClient | null;
  // connect: (host: string, mqttOptions: IClientOptions) => void;
  // disconnect: () => void;
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
  chat: string[];
  inGame: boolean;
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
});

export const useMQTT = () => useContext(MQTTContext);

const MQTTProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser);
  const [inGame, setInGame] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([]);
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    const clientMQTT = mqtt.connect("ws://localhost", { port: 8081 });
    setClient(clientMQTT);
    // clientMQTT.subscribe(`game/${id}/chat`);
    // clientMQTT.subscribe(`game/${id}/move`);
    // clientMQTT.subscribe("lobby/#");
    clientMQTT.on("connect", () => console.log("connected"));
    clientMQTT.on("message", (topic, message, packet) => {
      if (topic === "lobby") {
        console.log("lobby");
      }
      if (topic === `game/${user?.id}/chat`) {
        const m = JSON.parse(message.toString());
        console.log(m);

        setChat((prev) => [...prev, message.toString()]);
      }
      console.log(packet);
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
      setSubscribedTopics(() => [...subscribedTopics, topic]);
    }
  };

  const unsubscribe = (topic: string) => {
    if (client && subscribedTopics.includes(topic)) {
      client.unsubscribe(topic);
      setSubscribedTopics(() => subscribedTopics.filter((t) => t !== topic));
    }
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
        inGame
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};

export default MQTTProvider;
