import { object, string, TypeOf } from "zod";

export const createThreadSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    })
      .min(3, "Invalid title")
      .max(50, "Invalid title"),
    content: string({
      required_error: "Content is required",
    })
      .min(3, "Invalid content")
      .max(500, "Invalid content"),
  }),
});

export type CreateThreadInput = TypeOf<typeof createThreadSchema>["body"];
