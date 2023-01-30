import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { getThreads, selectPage } from "../../reducers/threadsReducer";
import Button from "../button/Button";

interface DeleteThreadModalProps {
  threadId: string;
}

const DeleteThreadModal = (props: DeleteThreadModalProps) => {
  const page = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      axios.delete(`http://localhost:5000/api/thread/${props.threadId}`, {
        withCredentials: true,
      });
      await dispatch(getThreads(page));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-stone-300">
      <p>Czy na pewno chcesz usunąć wątek?</p>
      <Button className="self-center" onClick={handleDelete}>
        Usuń
      </Button>
    </div>
  );
};

export default DeleteThreadModal;
