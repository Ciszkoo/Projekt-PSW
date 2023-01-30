import { getModelForClass, prop } from "@typegoose/typegoose";

export class Comment {
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

  @prop({ required: true })
  public thread!: string;
}

export const CommentModel = getModelForClass(Comment);
