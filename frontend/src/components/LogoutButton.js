import React from "react";
import { useDispatch } from "react-redux";

import { user } from "../reducers/user";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(user.actions.deleteAccessToken());
    dispatch(user.actions.deleteUserId());
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;