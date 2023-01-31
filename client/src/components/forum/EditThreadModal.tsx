import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../button/Button";

const editThreadSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500),
});

type EditThreadSchemaType = z.infer<typeof editThreadSchema>;

interface EditThreadModalProps {
  threadId: string;
  title: string;
  content: string;
  refresh: () => void;
}

const EditThreadModal = (props: EditThreadModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<EditThreadSchemaType>({
    resolver: zodResolver(editThreadSchema),
    defaultValues: {
      title: props.title,
      content: props.content,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/thread/${props.threadId}`,
        data,
        {
          withCredentials: true,
        }
      );
      props.refresh();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      className="flex flex-col gap-2 text-stone-300 w-[50vw] h-[50vh]"
      onSubmit={onSubmit}
    >
      <p className="font-bold">Edytuj wątek:</p>
      <input
        className="bg-stone-500 p-2 rounded-md focus:outline-none"
        type="text"
        placeholder="Tytuł"
        {...register("title")}
      />
      <textarea
        className="flex-auto bg-stone-500 p-2 rounded-md focus:outline-none resize-none"
        placeholder="Treść"
        {...register("content")}
        disabled={isSubmitting || isSubmitted}
      />
      {!isSubmitted && (
        <Button className="self-center" type="submit" disabled={isSubmitting}>
          Edytuj
        </Button>
      )}
      {isSubmitted && (
        <p className="self-center">Wątek został zedytowany</p>
      )}
    </form>
  );
};

export default EditThreadModal;
