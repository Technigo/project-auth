
import React from "react";
import { useDispatch } from "react-redux";

import user from "../reducers/user";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D9AFD9;
  margin: 0 auto;
  margin-top: 10px;
  border:none;
  border-radius: 5px;
  height: 50px;
  width: 100px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  font-family: 'PT Sans', sans-serif;
  padding:0;
`;

const LogoutButton = () => {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(user.actions.deleteAccessToken());
    dispatch(user.actions.deleteUserId());
  };

  return (
    <div>
      <Button onClick={Logout}>Sign out</Button>
    </div>

  );
};

export default LogoutButton;