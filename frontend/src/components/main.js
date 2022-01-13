import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import user from "../reducers/user";
import { useNavigate, Link } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setError(null));
    });
  };

  return (
    <div>
      <p>THE SECRET!</p>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};
