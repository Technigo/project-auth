// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

export const Logout = () => {
  const navigate = useNavigate();
  const { setAccessToken, setIsLoggedIn, setUser } = userStore();

  const handleLogOut = () => {
    {
      // Clear local user data (if needed)
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(true);

      // Redirect to the login page
      navigate("/");
    }
  };

  return <button onClick={handleLogOut}>Log out!</button>;
};
