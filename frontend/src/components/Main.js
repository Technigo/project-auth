import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import thoughts from "../reducers/thoughts";

import {
  MainMessage,
  MessageContainer,
  MessageDiv,
  LogoutButton,
} from "./StyledComponents";

import user from "../reducers/user";

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, [dispatch, accessToken]);

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setEmail(null));
      dispatch(user.actions.setAccessToken(null));
    });
    localStorage.removeItem("user");
  };

  return (
    <MainMessage>
      <h1>Protected happy thoughts:</h1>
      <MessageContainer>
        {thoughtsItems.map((item) => (
          <MessageDiv key={item._id}>{item.message}</MessageDiv>
        ))}
      </MessageContainer>
      <LogoutButton type="button" onClick={() => onButtonClick()}>
        Log out
      </LogoutButton>
    </MainMessage>
  );
};

export default Main;
