import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import thoughts from "../reducers/thoughts";

import {
  FlexItem,
  FormDiv,
  MessageDiv,
  LogoutButton,
  Field,
  MessageBox,
} from "./StyledComponents";

import user from "../reducers/user";

const Main = () => {
  const [message, setMessage] = useState("");

  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    };
    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(thoughts.actions.setNewItems(data.response));
            dispatch(thoughts.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(thoughts.actions.setError(data.response));
          });
        }
      });
  };

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
    <FlexItem>
      <h1>Protected happy thoughts:</h1>
      <Field>
        <FormDiv onSubmit={onFormSubmit}>
          <MessageDiv>
            <input
              type="text"
              id="text"
              placeholder="write your message here"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <LogoutButton type="submit">Send</LogoutButton>

            {thoughtsItems.map((item) => (
              <MessageBox key={item._id}>{item.message}</MessageBox>
            ))}
          </MessageDiv>
          <LogoutButton type="button" onClick={() => onButtonClick()}>
            Log out
          </LogoutButton>
        </FormDiv>
      </Field>
    </FlexItem>
  );
};

export default Main;
