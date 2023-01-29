import { Request, Response } from "express";
import { ThreadModel } from "../models/thread.model";
import { UserModel } from "../models/user.model";

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

export const handleGetThreads = async (req: Request, res: Response) => {
  if (!req.session.passport) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const id = req.session.passport.user;
  const page = req.params.page;
  const skip = (parseInt(page, 10) - 1) * 10;
  const threads = await ThreadModel.aggregate([
    { $sort: { date: -1 } },
    { $skip: skip },
    { $limit: 10 },
  ]);
  const threadsCount = await ThreadModel.countDocuments();
  const result = await Promise.all(
    threads.map(async (thread) => {
      const upvotes = thread.upvotes.length;
      const downvotes = thread.downvotes.length;
      const rate = thread.upvotes.includes(id)
        ? "upvoted"
        : thread.downvotes.includes(id)
        ? "downvoted"
        : null;
      const username = await UserModel.findById(thread.author).then(user => {
        if (user) {
          return user.username;
        }
        return "Użytkownik usunięty"
      });
      return {
        id: thread._id,
        title: thread.title,
        author: username,
        authorId: thread.author,
        date: thread.date,
        upvotes,
        downvotes,
        rate,
      };
    })
  );
  return res.status(200).send({threadsCount, threads: result});
};
