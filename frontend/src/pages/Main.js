import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import secret from "../reducers/secret";
import user from "../reducers/user";
import { API_URL } from "../reusable/urls";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 40px;
`;

const Button = styled.button`
  background: white;
  border: none;
  box-shadow: 2px 2px 1px 2px grey;
  border-radius: 5px;
`;

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const secrets = useSelector((store) => store.secret.message);

  useEffect(() => {
    if (!accessToken) {
      history.push("/Login");
    }
  }, [accessToken, history]);

  useEffect(() => {
    const option = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL("secret"), option)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(secret.actions.setSecret(data));
          dispatch(secret.actions.setErrors(null));
        } else {
          dispatch(secret.actions.setErrors(data));
        }
      })
      .catch(() => dispatch(secret.actions.setErrors("Catch error")));
  }, [accessToken, dispatch]);

  const handleClick = () => {
    localStorage.clear();
    dispatch(
      user.actions.setUser({ userID: null, accessToken: null, errors: null })
    );
    dispatch(secret.actions.setSecret(null));
  };

  return (
    <Wrapper>
      <Title>{secrets ? secrets.message : "loading..."}</Title>
      <Button onClick={handleClick}>Log out</Button>
    </Wrapper>
  );
};

export default Main;
