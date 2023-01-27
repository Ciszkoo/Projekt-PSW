import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      await axios.delete("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-stone-300">
      <h1>Czy napewno chcesz usunąć konto?</h1>
      <button
        className="bg-stone-600 py-2 px-4 w-min self-center rounded-full shadow-md active:shadow-inner"
        onClick={handleDelete}
      >
        Tak
      </button>
    </div>
  );
};

export default DeleteAccount;
