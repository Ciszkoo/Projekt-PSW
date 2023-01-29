import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../reducers/authReducer";
import { useAppSelector } from "../../reducers/hooks";
import { Thread } from "../../reducers/threadsReducer";
import { useModal } from "../modal/Modal";
import DeleteThreadModal from "./DeleteThreadModal";

interface ThreadSummProps {
  thread: Thread;
}

const ThreadSumm = (props: ThreadSummProps) => {
  const user = useAppSelector(selectUser);

  const { openModal, modalPortal } = useModal(
    <DeleteThreadModal threadId={props.thread.id} />
  );

  const navigate = useNavigate();

  const handleNavigateToThread = (id: string) => {
    navigate(`/thread/${id}`);
  };

  return (
    <li className="bg-stone-600 p-2 rounded-xl shadow-md">
      <div className="flex justify-between">
        <p
          className="hover:cursor-pointer hover:underline truncate"
          onClick={() => handleNavigateToThread(props.thread.id)}
        >
          {props.thread.title}
        </p>
        <div className="flex gap-2">
          {user && props.thread.authorId === user.id && (
            <button onClick={openModal}>
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          <button
            className={`flex hover:underline ${
              props.thread.rate === "upvoted" && "text-green-500"
            }`}
          >
            <ChevronUpIcon className="h-5 w-5" />
            <p>{props.thread.upvotes}</p>
          </button>
          <button
            className={`flex hover:underline ${
              props.thread.rate === "downvoted" && "text-red-500"
            }`}
          >
            <ChevronDownIcon className="h-5 w-5" />
            <p>{props.thread.downvotes}</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-xs flex gap-2">
          Autor:
          <p className="hover:cursor-pointer hover:underline">
            {props.thread.author}
          </p>
        </div>
        <p className="text-xs">
          {props.thread.date.slice(0, 19).replace("T", " ")}
        </p>
      </div>
      {modalPortal}
    </li>
  );
};

export default ThreadSumm;
