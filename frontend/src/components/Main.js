import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import user from "reducers/user";
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Hello User </h1>
      <h2>You are logged in </h2>
      <button
        type="button"
        onClick={() => {
          navigate("/");
          dispatch(user.actions.setAccessToken(null));
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Main;
