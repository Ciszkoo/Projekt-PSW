import { Request, Response } from "express";
import { CommentModel } from "../models/comment.model";
import { ThreadModel } from "../models/thread.model";

export const handleCreateComment = async (req: Request, res: Response) => {
  if (!req.session.passport) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const id = req.session.passport.user;
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
