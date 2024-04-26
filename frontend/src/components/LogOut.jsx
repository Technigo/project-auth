// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "./UserStore";

export const Logout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setAccessToken, setIsLoggedIn, setUser } = userStore();

  useEffect(() => {
    // Ensure that the Logout component remains visible even after logging in
    // by checking the isLoggedIn state and taking appropriate action
    if (isLoggedIn) {
      // Redirect to the appropriate route after logout
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
      <button onClick={handleLogOut}>Log out!</button>
    </>
  );
};
