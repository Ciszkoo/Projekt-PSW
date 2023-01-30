import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editUsername, selectUser } from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import Button from "../button/Button";

const EditSchema = z.object({
  value: z.string().min(3).max(20),
});

type EditSchemaType = z.infer<typeof EditSchema>;

const EditUsername = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<EditSchemaType>({
    resolver: zodResolver(EditSchema),
    defaultValues: { value: user?.username },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(editUsername(data.value));
      setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="text-stone-300 flex flex-col gap-2" onSubmit={onSubmit}>
      <input
        className="bg-stone-500 p-2 rounded-md focus:outline-none"
        type="text"
        autoComplete="off"
        spellCheck="false"
        disabled={isSubmitting || isSubmitted}
        {...register("value")}
      />
      {!isEdited && (
        <Button className="self-center" type="submit">
          Edytuj
        </Button>
      )}
      {isEdited && <p>Zaktualizowano</p>}
    </form>
  );
};

export default EditUsername;
