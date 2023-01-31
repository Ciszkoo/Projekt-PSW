import { Request, Response } from "express";
import { CommentModel } from "../models/comment.model";
import { ThreadModel } from "../models/thread.model";

export const handleCreateComment = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const threadId = req.params.threadId;
  const newComment = await CommentModel.create({
    ...req.body,
    author: id,
    date: new Date(),
    upvotes: [],
    downvotes: [],
    thread: threadId,
  });
  return res.status(201).send(newComment._id);
};

export const handleDeleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  await CommentModel.findByIdAndDelete(commentId);
  return res.status(200).send({ message: "Comment deleted" });
};

export const handleEditComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const comment = await CommentModel.findByIdAndUpdate(commentId, req.body, {
    new: true,
  });
  if (!comment) {
    return res.status(404).send({ message: "Comment not found" });
  }
  return res.status(200).send({ message: "Comment edited" });
};
