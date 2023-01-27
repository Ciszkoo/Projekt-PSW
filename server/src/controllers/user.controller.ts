import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { RegisterUserInput } from "../schema/user.schema";
import { hashPassword } from "../utils/hashPassword";

export const handleRegister = async (
  req: Request<{}, {}, RegisterUserInput>,
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
