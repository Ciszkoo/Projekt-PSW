import { object, string, TypeOf } from "zod";

export const registerSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Invalid password")
      .max(20, "Invalid password"),
    username: string({ required_error: "Username is required" })
      .min(3, "Invalid username")
      .max(20, "Invalid username"),
  }),
});

export type RegisterUserInput = TypeOf<typeof registerSchema>["body"];
