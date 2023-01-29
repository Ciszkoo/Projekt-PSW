import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import { selectThreads } from "../../reducers/threadsReducer";
import ThreadSumm from "./ThreadSumm";

const ThreadsList = () => {
  const threads = useAppSelector(selectThreads);

  return (
    <ul className="px-10 flex flex-col gap-2">
      {threads.currrentThreads.map((thread) => (
        <ThreadSumm key={thread.id} thread={thread} />
      ))}
    </ul>
  );
};

export default ThreadsList;
