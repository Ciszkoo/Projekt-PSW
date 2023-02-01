import React, { useEffect } from "react";
import { ChatMessage } from "./Ingame";
import MessageForm from "./MessageForm";

interface ChatProps {
  chat: ChatMessage[];
}

const Chat = (props: ChatProps) => {
  return (
    <div className="basis-1/3 flex flex-col bg-stone-800 p-5 rounded-md gap-2">
      <div className="grow bg-stone-500 p-2 overflow-auto max-h-[80vh]">
        {props.chat.map((message, index) => (
          <div key={index} className="p-1">
            {message.user}: {message.message}
          </div>
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Chat;
