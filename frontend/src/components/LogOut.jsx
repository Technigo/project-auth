// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

export const Logout = () => {
  const navigate = useNavigate();
  const { logout, setAccessToken, setIsLoggedIn, setUser } = userStore();

  const handleLogOut = async () => {
    try {
      // Call logout function to clear authentication state
      await logout();

      // Clear local user data (if needed)
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(false);

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any errors that occur during logout
    }
  };

  return <button onClick={handleLogOut}>Log out!</button>;
};
