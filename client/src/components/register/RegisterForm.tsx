import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Card from "../card/Card";

const RegisterSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("http://localhost:5000/api/user", data);
      console.log("Registered!");
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  });

  return (
    <Card>
      <form className="flex flex-col gap-2 p-5" onSubmit={onSubmit}>
        <p className="font-bold self-center">Rejestracja</p>
        <input
          className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
          type="text"
          placeholder="Username..."
          autoComplete="off"
          {...register("username")}
        />
        <input
          className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
          type="email"
          placeholder="E-mail..."
          autoComplete="off"
          {...register("email")}
        />
        <input
          className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <button
          className="bg-stone-500 self-center py-2 px-4 rounded-full shadow-md active:shadow-inner"
          type="submit"
        >
          Register
        </button>
      </form>
    </Card>
  );
};

export default RegisterForm;
