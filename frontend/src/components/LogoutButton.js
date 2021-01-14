import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { user } from "../reducers/user";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(user.actions.deleteAccessToken());
    dispatch(user.actions.deleteUserId());
    history.push("/");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton;