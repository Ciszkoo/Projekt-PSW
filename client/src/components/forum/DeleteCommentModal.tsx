import axios from "axios";
import React from "react";
import Button from "../button/Button";

interface DeleteCommentModalProps {
  commentId: string;
  refresh: () => void;
}

const DeleteCommentModal = (props: DeleteCommentModalProps) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/comment/${props.commentId}`,
        {
          withCredentials: true,
        }
      );
      props.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-stone-300">
      <p>Czy na pewno chcesz usunąć komentarz?</p>
      <Button className="self-center" onClick={handleDelete}>
        Usuń
      </Button>
    </div>
  );
};

export default DeleteCommentModal;
