// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

export const Logout = () => {
  const navigate = useNavigate();

  const { setAccessToken, setIsLoggedIn, setUser } = userStore();

  const handleLogOut = () => {
    setUser(null);
    setAccessToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");

    alert("Log out successful!");
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
};
