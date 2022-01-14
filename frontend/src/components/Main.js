import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import styled from "styled-components";

import user from "../reducers/user";
import { Button } from "./Login";
import LoadingSpinner from "./LoadingSpinner";
import planetIcon from "../assets/planet-icon.png";
import spaceGif1 from "../assets/space-gif1.gif";
import spaceGif2 from "../assets/space-gif2.gif";
import spaceGif3 from "../assets/space-gif3.gif";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
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

const PlanetImg = styled.img`
  width: 40px;
  vertical-align
`;

const ButtonContainer = styled.div`
  align-self: center;
`;

const BodyContainer = styled.div`
  position: absolute;
  top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const GifsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const GifImg = styled.img`
  width: 300px;
  border-radius: 15px;
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
      setTimeout(() => jsConfetti.addConfetti(), 2000);
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
          <HeaderContainer className="Header">
            <MainTitle>
              {mode === "signin"
                ? "Welcome back to your space center, "
                : "Welcome to the center, "}
              {username}! <PlanetImg src={planetIcon} alt="planets" />
            </MainTitle>
            <ButtonContainer>
              {accessToken && (
                <Button className="logout-button" onClick={onButtonClick}>
                  Logout
                </Button>
              )}
            </ButtonContainer>
          </HeaderContainer>
          <BodyContainer>
            <h2>Your spacy gifs 🚀</h2>
            <GifsContainer>
              <GifImg src={spaceGif1} />

              <GifImg src={spaceGif2} />

              <GifImg src={spaceGif3} />
            </GifsContainer>
          </BodyContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Main;

//HEJA HEJA YOU CAN DO IT!!
