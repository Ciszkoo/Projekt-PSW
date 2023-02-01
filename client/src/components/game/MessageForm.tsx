import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/authReducer";
import { useMQTT } from "../../mqttContext/MQTTProvider";

const MessageSchema = z.object({
  message: z.string().min(1).max(100),
});

type MessageSchemaType = z.infer<typeof MessageSchema>;

const MessageForm = () => {
  const user = useAppSelector(selectUser);
  const { publish, gameId } = useMQTT();

  const { register, handleSubmit, reset } = useForm<MessageSchemaType>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = handleSubmit((data) => {
    publish(
      `game/${gameId}/chat`,
      JSON.stringify({ user: user?.username, message: data.message })
    );
    reset();
  });

  return (
    <form className="bg-stone-500 flex justify-between" onSubmit={onSubmit}>
      <input
        className="bg-inherit focus:outline-none active:outline-none w-[90%] p-2"
        placeholder="Napisz..."
        autoComplete="off"
        spellCheck="false"
        {...register("message")}
      />
      <button
        type="submit"
        className="bg-inherit focus:outline-none active:outline-none w-8"
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default MessageForm;
