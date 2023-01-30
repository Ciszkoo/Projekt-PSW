import { object, string, TypeOf } from "zod";

export const createCommentSchema = object({
  body: object({
    content: string({
      required_error: "Content is required",
    })
      .min(3, "Invalid content")
      .max(500, "Invalid content"),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>["body"];
