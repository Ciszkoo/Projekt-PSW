import React from "react";
import Card from "../card/Card";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const threads = [
  {
    id: 1,
    title: "Wątek 1",
    creator: "Kamil",
    createdAt: "2021-10-10",
    upvotes: 10,
    downvotes: 0,
    rate: "upvote",
  },
  {
    id: 2,
    title: "Wątek 2",
    creator: "Kamil",
    createdAt: "2021-10-10",
    upvotes: 10,
    downvotes: 0,
    rate: "downvote",
  },
  {
    id: 3,
    title: "Wątek 3",
    creator: "Kamil",
    createdAt: "2021-10-10",
    upvotes: 10,
    downvotes: 0,
    rate: null,
  },
];

const Forum = () => {
  return (
    <div className="flex-auto p-10 w-full flex items-stretch justify-center">
      <Card customClass="grow flex-initial w-full flex flex-col gap-2">
        <div className="flex gap-5">
          <button className="bg-stone-600 p-2 rounded-full basis-2/3 hover:bg-stone-800">
            Utwórz wątek
          </button>
          <button className="bg-stone-600 p-2 rounded-full basis-1/3 hover:bg-stone-800">
            Szukaj
          </button>
        </div>
        <ul className="px-10 flex flex-col gap-2">
          {threads.map((thread) => (
            <li className="bg-stone-600 p-2 rounded-xl" key={thread.id}>
              <div className="flex justify-between">
                <p className="hover:cursor-pointer hover:underline truncate">
                  {thread.title}
                </p>
                <div className="flex gap-2">
                  <button
                    className={`flex hover:underline ${
                      thread.rate === "upvote" && "text-green-500"
                    }`}
                  >
                    <ChevronUpIcon className="h-5 w-5" />
                    <p>{thread.upvotes}</p>
                  </button>
                  <button
                    className={`flex hover:underline ${
                      thread.rate === "downvote" && "text-red-500"
                    }`}
                  >
                    <ChevronDownIcon className="h-5 w-5" />
                    <p>{thread.downvotes}</p>
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-xs flex gap-2">
                  Autor:
                  <p className="hover:cursor-pointer hover:underline">
                    {thread.creator}
                  </p>
                </p>
                <p className="text-xs">{thread.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Forum;
