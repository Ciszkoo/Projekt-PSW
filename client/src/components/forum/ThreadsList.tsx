import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectThreads } from "../../reducers/threadsReducer";

const ThreadsList = () => {
  const [isVisibleDeleteButton, setIsVisibleDeleteButton] = useState();
  const threads = useAppSelector(selectThreads);
  const navigate = useNavigate();

  const handleNavigateToThread = (id: string) => {
    navigate(`/thread/${id}`);
  };


  return (
    <ul className="px-10 flex flex-col gap-2">
      {threads.currrentThreads.map((thread) => (
        <li className="bg-stone-600 p-2 rounded-xl shadow-md" key={thread.id}>
          <div className="flex justify-between">
            <p className="hover:cursor-pointer hover:underline truncate" onClick={() => handleNavigateToThread(thread.id)}>
              {thread.title}
            </p>
            <div className="flex gap-2">
              <button
                className={`flex hover:underline ${
                  thread.rate === "upvoted" && "text-green-500"
                }`}
              >
                <ChevronUpIcon className="h-5 w-5" />
                <p>{thread.upvotes}</p>
              </button>
              <button
                className={`flex hover:underline ${
                  thread.rate === "downvoted" && "text-red-500"
                }`}
              >
                <ChevronDownIcon className="h-5 w-5" />
                <p>{thread.downvotes}</p>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs flex gap-2">
              Autor:
              <p className="hover:cursor-pointer hover:underline">
                {thread.author}
              </p>
            </div>
            <p className="text-xs">
              {thread.date.slice(0, 19).replace("T", " ")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThreadsList;
