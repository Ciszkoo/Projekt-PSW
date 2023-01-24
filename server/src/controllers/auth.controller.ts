import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { CreateSessionInput } from "../schema/auth.schema";
import { hashPassword } from "../utils/hashPassword";

export const handleRegister = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const { email } = req.body;
  const userDB = await UserModel.findOne({ email });
  if (userDB) {
    res.status(400).send({ message: "User already exists" });
  }
  const password = await hashPassword(req.body.password);
  const newUser = await UserModel.create({ ...req.body, password: password });
  res.status(201).send({ message: "User created" });
};
