import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const path = location.pathname.split("/")[1];
    setActive(path);
  }, [location.pathname]);

  const handleChangePath = (path: string) => {
    navigate(`/${path}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-stone-800 h-16 shadow-md flex justify-between gap-10">
      <div className="flex pr-10">
        <div
          className={`${
            active === "home" && "bg-stone-900"
          } hover:cursor-pointer hover:bg-stone-900 h-full flex items-center px-10`}
          onClick={() => handleChangePath("home")}
        >
          <p>Graj</p>
        </div>
        <div
          className={`${
            active === "forum" && "bg-stone-900"
          } hover:cursor-pointer hover:bg-stone-900 h-full flex items-center px-10`}
          onClick={() => handleChangePath("forum")}
        >
          <p>Forum</p>
        </div>
        <div
          className={`${
            active === "profile" && "bg-stone-900"
          } hover:cursor-pointer hover:bg-stone-900 h-full flex items-center px-10`}
          onClick={() => handleChangePath("profile")}
        >
          <p>Profil</p>
        </div>
      </div>
      <div
        className="hover:cursor-pointer hover:bg-stone-900 h-full flex items-center px-10"
        onClick={handleLogout}
      >
        <p>Wyloguj</p>
      </div>
    </nav>
  );
};

export default NavBar;
