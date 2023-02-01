import { prop, getModelForClass } from "@typegoose/typegoose";

export class GameSession {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public owner!: string;

  @prop({ required: true, expires: 60 * 60 * 2 })
  public expiresAt!: Date;

  @prop()
  public white!: string;

  @prop()
  public black!: string;
}

export const GameSessionModel = getModelForClass(GameSession);
