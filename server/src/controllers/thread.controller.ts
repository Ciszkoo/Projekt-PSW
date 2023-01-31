import { Request, Response } from "express";
import { CommentModel } from "../models/comment.model";
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
  return res.status(201).send(newThread._id);
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
      const username = await UserModel.findById(thread.author).then((user) => {
        if (user) {
          return user.username;
        }
        return "Użytkownik usunięty";
      });
      return {
        id: thread._id,
        title: thread.title,
        content: thread.content,
        author: username,
        authorId: thread.author,
        date: thread.date,
        upvotes,
        downvotes,
        rate,
      };
    })
  );
  return res.status(200).send({ threadsCount, threads: result });
};

export const handleDeleteThread = async (req: Request, res: Response) => {
  const threadId = req.params.id;
  await ThreadModel.findByIdAndDelete(threadId);
  return res.status(200).send({ message: "Thread deleted" });
};

export const handleGetThreadComments = async (req: Request, res: Response) => {
  if (!req.session.passport) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const id = req.session.passport.user;
  const threadId = req.params.id;
  const comments = await CommentModel.find({ thread: threadId }).sort({
    date: -1,
  });
  const result = await Promise.all(
    comments.map(async (comment) => {
      const upvotes = comment.upvotes.length;
      const downvotes = comment.downvotes.length;
      const rate = comment.upvotes.includes(id)
        ? "upvoted"
        : comment.downvotes.includes(id)
        ? "downvoted"
        : null;
      const username = await UserModel.findById(comment.author).then((user) => {
        if (user) {
          return user.username;
        }
        return "Użytkownik usunięty";
      });
      return {
        id: comment._id,
        content: comment.content,
        author: username,
        authorId: comment.author,
        date: comment.date,
        upvotes,
        downvotes,
        rate,
      };
    })
  );
  return res.status(200).send(result);
};

export const handleGetThread = async (req: Request, res: Response) => {
  const threadId = req.params.id;
  const thread = await ThreadModel.findById(threadId);
  if (!thread) {
    return res.status(404).send({ message: "Thread not found" });
  }
  const author = await UserModel.findById(thread.author);
  const resThread = {
    id: thread._id,
    title: thread.title,
    content: thread.content,
    author: author ? author.username : "Użytkownik usunięty",
    authorId: thread.author,
    date: thread.date,
    upvotes: thread.upvotes.length,
    downvotes: thread.downvotes.length,
  };
  const comments = await CommentModel.find({ thread: threadId }).sort({
    date: -1,
  });
  const result = await Promise.all(
    comments.map(async (comment) => {
      const username = await UserModel.findById(comment.author).then((user) => {
        if (user) {
          return user.username;
        }
        return "Użytkownik usunięty";
      });
      return {
        id: comment._id,
        content: comment.content,
        author: username,
        authorId: comment.author,
        date: comment.date,
        upvotes: comment.upvotes.length,
        downvotes: comment.downvotes.length,
      };
    })
  );
  return res.status(200).send({ ...resThread, comments: result });
};
