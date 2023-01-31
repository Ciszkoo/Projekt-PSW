import React from "react";
import { Comment as CommentType } from "./Thread";

interface CommentProps {
  comment: CommentType;
}

const Comment = (props: CommentProps) => {
  return (
    <li className="bg-stone-600 rounded-xl px-10 py-5 flex flex-col">
      <div className="text-xs flex gap-2">
        <p>{props.comment.author}</p>
        <p>{props.comment.date.slice(0, 19).replace("T", " ")}</p>
      </div>
      <div className="break-words">{props.comment.content}</div>
    </li>
  );
};

export default Comment;
