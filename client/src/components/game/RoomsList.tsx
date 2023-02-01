import axios from "axios";
import React, { useEffect, useState } from "react";

interface Room {
  id: string;
  name: string;
  owner: string;
  white: string;
  black: string;
  whiteName: string;
  blackName: string;
}

const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const res = axios
  //       .get<Room[]>("http://localhost:5000/api/game/", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setRooms(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <ul className="flex gap-5">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="flex gap-5 basis-1/2 bg-stone-800 p-2 rounded-md"
        >
          <div className="flex-auto flex flex-col gap-2">
            <div className="text-2xl font-bold">{room.name}</div>
            <div className="flex gap-5">
              <div className="flex-auto flex flex-col gap-2">
                <div className="text-xl font-bold">Biały:</div>
                <div className="text-xl">{room.whiteName}</div>
              </div>
              <div className="flex-auto flex flex-col gap-2">
                <div className="text-xl font-bold">Czarny:</div>
                <div className="text-xl">{room.blackName}</div>
              </div>
            </div>
          </div>
          <button className="self-center bg-green-700 text-black p-5 text-3xl font-bold rounded-full shadow-md hover:bg-green-600 active:bg-green-800 active:shadow-inner">
            Dołącz
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
