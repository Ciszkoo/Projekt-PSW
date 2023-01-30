import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../button/Button";

const CreateThreadSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500),
});

type CreateThreadSchemaType = z.infer<typeof CreateThreadSchema>;

const CreateThreadModal = () => {
  const { register, handleSubmit } = useForm<CreateThreadSchemaType>({
    resolver: zodResolver(CreateThreadSchema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const id = await axios.post("http://localhost:5000/api/thread", data);
      navigate(`/thread/${id.data}`);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      className="flex flex-col gap-2 text-stone-300 w-[50vw] h-[50vh]"
      onSubmit={onSubmit}
    >
      <p className="font-bold">Nowy wątek:</p>
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
      />
      <Button className="self-center" type="submit">
        Utwórz wątek
      </Button>
    </form>
  );
};

export default CreateThreadModal;
