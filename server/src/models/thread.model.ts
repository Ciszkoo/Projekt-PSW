import { getModelForClass, prop } from "@typegoose/typegoose";

export class Thread {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public content!: string;

  @prop({ required: true })
  public author!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({ required: true })
  public upvotes!: [string];

  @prop({ required: true })
  public downvotes!: [string];
  
}

export const ThreadModel = getModelForClass(Thread);