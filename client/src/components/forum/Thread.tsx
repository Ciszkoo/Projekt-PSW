import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../reducers/authReducer";
import { useAppSelector } from "../../reducers/hooks";
import {
  selectThreads,
  Thread as ThreadType,
} from "../../reducers/threadsReducer";
import Button from "../button/Button";
import Card from "../card/Card";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useModal } from "../modal/Modal";
import EditThreadModal from "./EditThreadModal";

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  upvotes: number;
  downvotes: number;
  rate: "upvoted" | "downvoted" | null;
}

interface SingleThread extends ThreadType {
  comments: Comment[];
}

const Thread = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [thread, setThread] = useState<SingleThread | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    axios
      .get<SingleThread>(`http://localhost:5000/api/thread/single/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setThread(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(id);
    axios
      .get<SingleThread>(`http://localhost:5000/api/thread/single/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setThread(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const editThreadModal = useModal(
    <EditThreadModal
      threadId={thread?.id as string}
      title={thread?.title as string}
      content={thread?.content as string}
      refresh={handleRefresh}
    />
  );

  return (
    <div className="flex-auto p-10 w-full flex items-stretch justify-center">
      <Card customClass="grow flex-initial w-full flex flex-col gap-2 relative">
        <Button className="absolute top-2 right-2" onClick={handleNavigateBack}>
          Cofnij
        </Button>
        <div className="bg-stone-600 rounded-xl p-10 flex flex-col">
          <div className="text-xs flex gap-2">
            <p>{thread?.author}</p>
            <p>{thread?.date.slice(0, 19).replace("T", " ")}</p>
            <button onClick={editThreadModal.openModal}>
              <PencilSquareIcon className="h-3 w-3" />
            </button>
          </div>
          <div className="text-2xl font-bold break-words mb-2">
            {thread?.title}
          </div>
          <div className="break-words">{thread?.content}</div>
        </div>
        <CommentForm refresh={handleRefresh} />
        <ul className="flex flex-col gap-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            thread?.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                refresh={handleRefresh}
              />
            ))
          )}
        </ul>
      </Card>
      {editThreadModal.modalPortal}
    </div>
  );
};

export default Thread;
