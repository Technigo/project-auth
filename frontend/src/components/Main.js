import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import surfPosts from "reducers/surfPosts";
import { API_URL } from "utils/urls";

const Main = () => {
  const surfPostsItems = useSelector((store) => store.surfPosts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken);
  const username = useSelector(store => store.user.username);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    }
    fetch(API_URL("surfposts"), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(surfPosts.actions.setError(null));
          dispatch(surfPosts.actions.setItems(data.response));
        } else {
          dispatch(surfPosts.actions.setError(response));
          dispatch(surfPosts.actions.setItems([]));
        }
      });
  }, [])

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(surfPosts.actions.setItems([]));
  }

  return (
    <>
      <h2> Hi {username}! You are now logged in.</h2>
      <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
      {surfPostsItems.map(item => {
        return (
          <div>
            <p>{item.headline}</p>
            <p>{item.location}</p>
            <p>{item.message}</p>
            <p>{item.createdAt}</p>
            <p>{item.likes}</p>
          </div>
        )
      })}
    </>
  )
}

export default Main;