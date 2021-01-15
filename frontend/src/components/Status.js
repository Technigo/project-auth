import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "../reducers/user";

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();
    dispatch(user.actions.logout());
    dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
  };

  return (
    <>
      <section className="status">
        <p>{`${statusMessage}`}</p>
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </section>
    </>
  );
};
