// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

export const Logout = () => {
  const navigate = useNavigate();
  const logout = userStore((state) => state.handleLogout);
  //const { setAccessToken, setIsLoggedIn, setUser } = userStore();

  const handleLogOut = () => {
    //setUser(null);
    //setAccessToken(null);
    //setIsLoggedIn(false);
    //localStorage.removeItem("accessToken");
    logout(); // This should clear the token and update the isLoggedIn state.
    navigate("/"); // Redirect the user to the login page.
    alert("Log out successful!");
    //navigate("/logged-in");
    //navigate("/");
  };

  return (
    <>
      <button onClick={handleLogOut}>Log out!</button>
    </>
  );
};
