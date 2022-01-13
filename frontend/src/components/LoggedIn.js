import React from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import user from "reducers/user";
import { useNavigate } from "react-router-dom";

export const LoggedIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOutButtonClick = () => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    navigate("/");
  };

  return (
    <Container>
      <InfoContainer>
        <span>Welcome, the game is under construction!</span>
        <LogOutButton onClick={onLogOutButtonClick}>Log out</LogOutButton>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  display: flex;
  background-color: #00a48a;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 375px;
  background-color: #00a48a;
  display: flex;
  row-gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogOutButton = styled.button`
  background-color: #36a9ae;
  background-image: linear-gradient(#37adb2, #329ca0);
  border: 1px solid #2a8387;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px;
  color: #ffffff;
  cursor: pointer;
  display: block;
  font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  font-size: 17px;
  line-height: 100%;
  margin: 0;
  outline: 0;
  padding: 11px 15px 12px;
  text-align: center;
  transition: box-shadow 0.05s ease-in-out, opacity 0.05s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;

  &:hover {
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 2px inset,
      rgba(0, 0, 0, 0.4) 0 1px 2px;
    text-decoration: none;
    transition-duration: 0.15s, 0.15s;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 4px inset,
      rgba(0, 0, 0, 0.4) 0 1px 1px;
  }
`;
