import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import Button from "../button/Button";

const CommentSchema = z.object({
  content: z.string().min(3).max(500),
});

type CommentSchemaType = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  refresh: () => void;
}

const CommentForm = (props: CommentFormProps) => {
  const [value, setValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const { handleSubmit, register, reset } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
  });

  const { ref, onChange, ...rest } = register("content");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(e);
    setValue(val);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(`http://localhost:5000/api/comment/${id}`, data, {
        withCredentials: true,
      });
      props.refresh();
    } catch {
      console.log("error");
    }
    reset();
  });

  return (
    <form
      className="w-full my-2 bg-stone-400 px-10 py-2 rounded-xl flex items-center"
      onSubmit={onSubmit}
    >
      <textarea
        className="resize-none bg-inherit focus:outline-none flex-auto m-2 text-black placeholder-gray-500"
        onChange={handleChange}
        placeholder="Skomentuj"
        maxLength={500}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        {...rest}
      ></textarea>
      <Button type="submit">Dodaj komentarz</Button>
    </form>
  );
};

export default CommentForm;
