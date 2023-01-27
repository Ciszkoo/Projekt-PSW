import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => next(err));
  return res.status(200).send({ message: "Logged out" });
};

export const handleSessionCheck = async (req: Request, res: Response) => {
  if (!req.session.passport) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const id = req.session.passport.user;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  return res
    .status(200)
    .send({ id: user.id, email: user.email, username: user.username });
};

export const handleLogin = async (req: Request, res: Response) => {
  return res.status(200).send({ message: "Login successful" });
};
