import React, { useState } from "react";
import Card from "../card/Card";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { selectThreads } from "../../reducers/threadsReducer";
import ThreadsList from "./ThreadsList";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useModal } from "../modal/Modal";
import CreateThreadModal from "./CreateThreadModal";
import Button from "../button/Button";

const Forum = () => {
  const threads = useAppSelector(selectThreads);

  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate(`/forum/${threads.page + 1}`);
  };

  const handlePrevPage = () => {
    navigate(`/forum/${threads.page - 1}`);
  };

  const createThreadModal = useModal(<CreateThreadModal />);

  return (
    <div className="flex-auto p-10 w-full flex items-stretch justify-center">
      <Card customClass="grow flex-initial w-full flex flex-col gap-2 relative">
        <div className="flex gap-5">
          <Button className="basis-2/3" onClick={createThreadModal.openModal}>
            Utwórz wątek
          </Button>
          <Button className="basis-1/3">Szukaj</Button>
        </div>
        {threads.status === "loading" && <p>Ładowanie...</p>}
        {threads.status === "idle" && (
          <>
            <ThreadsList />
            <div className="absolute bottom-10 left-1/2 -translate-x-2/4 flex justify-center items-center gap-10">
              <Button
                className="disabled:bg-stone-800 disabled:shadow-none flex gap-2"
                onClick={handlePrevPage}
                disabled={threads.page === 1}
              >
                <ChevronDoubleLeftIcon className="h-5 w-5" />
                Poprzednia strona
              </Button>
              <p>{threads.page}</p>
              <Button
                className="disabled:bg-stone-800 disabled:shadow-none flex gap-2"
                onClick={handleNextPage}
                disabled={threads.nextThreads.length === 0}
              >
                Następna strona
                <ChevronDoubleRightIcon className="h-5 w-5 " />
              </Button>
            </div>
          </>
        )}
      </Card>
      {createThreadModal.modalPortal}
    </div>
  );
};

export default Forum;
