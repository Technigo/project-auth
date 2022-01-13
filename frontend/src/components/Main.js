import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import styled from "styled-components";

import user from "../reducers/user";
import { Button } from "./Login";
import LoadingSpinner from "./LoadingSpinner";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  gap: 25px;
  background-color: #f7e793bf;
  padding: 20px;
  box-shadow: 2px 2px 12px #f7e793bf, -2px -2px 12px #f7e793bf;
`;

const MainTitle = styled.h1`
  margin: 0;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  align-self: center;
`;

const Main = () => {
  const username = useSelector((store) => store.user.username);
  const accessToken = useSelector((store) => store.user.accessToken);
  const mode = useSelector((store) => store.user.mode);
  const loading = useSelector((store) => store.user.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    setTimeout(() => dispatch(user.actions.setLoading(false)), 2000);
    if (!accessToken) {
      navigate("/signin");
    } else if (mode === "signup") {
      jsConfetti.addConfetti();
    }
  }, [accessToken, navigate]);

  const onButtonClick = () => {
    dispatch(user.actions.setLoading(true));
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MainContainer>
          <MainTitle>
            {mode === "signin"
              ? "Welcome back to the future, "
              : "Welcome to the future, "}
            {username}!
          </MainTitle>
          <ButtonContainer>
            {accessToken && (
              <Button className="logout-button" onClick={onButtonClick}>
                Logout
              </Button>
            )}
          </ButtonContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Main;

//HEJA HEJA YOU CAN DO IT!!
