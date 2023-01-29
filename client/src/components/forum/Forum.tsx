import React, { useState } from "react";
import Card from "../card/Card";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import {
  selectThreads,
} from "../../reducers/threadsReducer";
import ThreadsList from "./ThreadsList";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const threads = useAppSelector(selectThreads);

  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate(`/forum/${threads.page + 1}`);
  };

  const handlePrevPage = () => {
    navigate(`/forum/${threads.page - 1}`);
  };

  return (
    <div className="flex-auto p-10 w-full flex items-stretch justify-center">
      <Card customClass="grow flex-initial w-full flex flex-col gap-2 relative">
        <div className="flex gap-5">
          <button className="bg-stone-600 p-2 rounded-full basis-2/3 hover:bg-stone-800 shadow-md active:shadow-inner">
            Utwórz wątek
          </button>
          <button className="bg-stone-600 p-2 rounded-full basis-1/3 hover:bg-stone-800 shadow-md active:shadow-inner">
            Szukaj
          </button>
        </div>
        {threads.status === "loading" && <p>Ładowanie...</p>}
        {threads.status === "idle" && (
          <>
            <ThreadsList />
            <div className="absolute bottom-10 left-1/2 -translate-x-2/4 flex justify-center items-center gap-10">
              <button
                className="disabled:bg-stone-800 disabled:shadow-none flex gap-2 bg-stone-600 py-2 px-4 rounded-full hover:bg-stone-900 shadow-md active:shadow-inner "
                disabled={threads.page === 1}
                onClick={handlePrevPage}
              >
                <ChevronDoubleLeftIcon className="h-5 w-5" />
                Poprzednia strona
              </button>
              <p>{threads.page}</p>
              <button
                className="disabled:bg-stone-800 disabled:shadow-none flex gap-2 bg-stone-600 py-2 px-4 rounded-full hover:bg-stone-900 shadow-md active:shadow-inner"
                disabled={threads.nextThreads.length === 0}
                onClick={handleNextPage}
              >
                Następna strona
                <ChevronDoubleRightIcon className="h-5 w-5 " />
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Forum;
