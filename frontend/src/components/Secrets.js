import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";
import styled from "styled-components";
import { useState } from "react";

const SecretsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const Secrets = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
  };

  return (
    <SecretsContainer>
      <p>This is a very secret message.</p>
      {username ? <p>This is a very secret message.</p> : ""}
      <LogoutButton type="button" onClick={onLogoutButtonClick}>
        Log out
      </LogoutButton>
    </SecretsContainer>
  );
};
