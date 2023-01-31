import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../button/Button";

interface EditCommentModalProps {
  commentId: string;
  content: string;
  refresh: () => void;
}

const CommentSchema = z.object({
  content: z.string().min(3).max(500),
});

type CommentSchemaType = z.infer<typeof CommentSchema>;

const EditCommentModal = (props: EditCommentModalProps) => {
  const [value, setValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitted },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: props.content,
    },
  });

  const { ref, onChange, ...rest } = register("content");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(e);
    setValue(val);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/comment/${props.commentId}`,
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
      className="flex flex-col gap-2 text-stone-300 w-[30vw]"
      onSubmit={onSubmit}
    >
      <p className="font-bold">Edytuj komentarz:</p>
      <textarea
        className="resize-none bg-stone-500 focus:outline-none flex-auto m-2 text-black placeholder-gray-500 py-2 px-4 rounded-xl"
        onChange={handleChange}
        placeholder="Skomentuj"
        maxLength={500}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        {...rest}
        disabled={isSubmitting || isSubmitted}
      />
      {!isSubmitted && (
        <Button type="submit" className="self-center" disabled={isSubmitting}>
          Edytuj
        </Button>
      )}
      {isSubmitted && <p className="self-center">Edytowano</p>}
    </form>
  );
};

export default EditCommentModal;
