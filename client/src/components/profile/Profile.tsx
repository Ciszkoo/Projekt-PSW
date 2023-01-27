import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { selectUser } from "../../reducers/authReducer";
import { useAppSelector } from "../../reducers/hooks";
import Card from "../card/Card";
import { useModal } from "../modal/Modal";
import EditEmail from "./EditEmail";
import EditUsername from "./EditUsername";

export const Profile = () => {
  const user = useAppSelector(selectUser);

  const usernameEditModal = useModal(<EditUsername />);
  const emailEditModal = useModal(<EditEmail />);

  return (
    <div className="flex-auto flex flex-col justify-center items-center">
      <Card customClass="w-[60%] basis-[40rem] flex flex-col items-center justify-center gap-10">
        <div className="flex gap-5">
          <div>Nazwa użytkownika: {user?.username}</div>
          <button onClick={usernameEditModal.openModal}>
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-5">
          <div>Adres e-mail: {user?.email}</div>
          <button onClick={emailEditModal.openModal}>
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </div>
      </Card>
      {usernameEditModal.modalPortal}
      {emailEditModal.modalPortal}
    </div>
  );
}

export default Profile;