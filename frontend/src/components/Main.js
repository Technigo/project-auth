import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";

const Main = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken);
  const username = useSelector(store => store.user.username);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken])

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
  }

  return (
    <>
      <h2> Hi {username}! You are now logged in.</h2>
      <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
    </>
  )
}

export default Main;