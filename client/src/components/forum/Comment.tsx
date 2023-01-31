import React from "react";
import { selectUser } from "../../reducers/authReducer";
import { useAppSelector } from "../../reducers/hooks";
import { Comment as CommentType } from "./Thread";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useModal } from "../modal/Modal";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

interface CommentProps {
  comment: CommentType;
  refresh: () => void;
}

const Comment = (props: CommentProps) => {
  const user = useAppSelector(selectUser);

  const deleteModal = useModal(
    <DeleteCommentModal commentId={props.comment.id} refresh={props.refresh} />
  );

  const editComment = useModal(
    <EditCommentModal
      commentId={props.comment.id}
      refresh={props.refresh}
      content={props.comment.content}
    />
  );

  return (
    <>
      <li className="bg-stone-600 rounded-xl px-10 py-5 flex flex-col relative">
        <div className="text-xs flex gap-2">
          <p>{props.comment.author}</p>
          <p>{props.comment.date.slice(0, 19).replace("T", " ")}</p>
        </div>
        <div className="break-words">{props.comment.content}</div>
        {user?.id === props.comment.authorId && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={editComment.openModal}>
              <PencilSquareIcon className="h-5 w-5" />
            </button>
            <button onClick={deleteModal.openModal}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </li>
      {editComment.modalPortal}
      {deleteModal.modalPortal}
    </>
  );
};

export default Comment;
