import { getModelForClass, prop } from "@typegoose/typegoose";
import { Document } from "mongoose";

export class User {
  @prop({ lowercase: true, required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(User);
