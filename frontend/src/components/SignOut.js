import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../reducers/users";

export const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.users.username);
  const securityLevel = useSelector((state) => state.users.securityLevel);

  const onSignOut = () => {
    dispatch(users.actions.setUserToLoggedOut());
    navigate("/");
  };

  return (
    <div>
      <h4>Signed in as: {username}</h4>
      <h5>Your securitylevel is: {securityLevel}</h5>
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};
