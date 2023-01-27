import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editEmail, selectUser } from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";

const EditSchema = z.object({
  value: z.string().email(),
});

type EditSchemaType = z.infer<typeof EditSchema>;

const EditEmail = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditSchemaType>({
    resolver: zodResolver(EditSchema),
    defaultValues: { value: user?.email },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(editEmail(data.value));
      setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="text-stone-300 flex flex-col gap-2" onSubmit={onSubmit}>
      <input
        className="bg-stone-500 p-2 rounded-md focus:outline-none"
        type="email"
        autoComplete="off"
        {...register("value")}
      />
      <button
        className="bg-stone-600 py-2 px-4 w-min self-center rounded-full shadow-md active:shadow-inner"
        type="submit"
      >
        Edytuj
      </button>
    </form>
  );
};

export default EditEmail;
