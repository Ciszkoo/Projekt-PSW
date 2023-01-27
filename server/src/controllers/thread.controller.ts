import { Request, Response } from "express";
import { ThreadModel } from "../models/thread.model";

export const handleCreateThread = async (req: Request, res: Response) => {
  if (!req.session.passport) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const id = req.session.passport.user;
  const newThread = await ThreadModel.create({
    ...req.body,
    author: id,
    date: new Date(),
    upvotes: [],
    downvotes: [],
  });
  return res.status(201).send({ message: "Thread created" });
};
