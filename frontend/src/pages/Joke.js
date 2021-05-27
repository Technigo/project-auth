import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";
import { JokeButton } from "components/Button";
import { Footer } from "components/Footer";
import logo from "assets/logonew.png";
import jokepic from "assets/jokepic.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  width: 90%;
  margin-bottom: 100px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (min-width: 768px) {
    flex-direction: column;
    // height: 70%;
    max-width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

const JokeContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  @media (min-width: 768px) {
    height: 60%;
  }
`;

const Setup = styled.h1`
  margin-bottom: 10px;
  text-align: center;
  line-height: 25px;
  font-size: 22px;
  color: #e56d6b;
`;

const Punchline = styled.h3`
  margin: 0px;
  font-weight: 400;
  color: #83868e;
  text-align: center;
  padding-bottom: 20px
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Logo = styled.img`
  width: 20%;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
    width: 120px;
  }
  @media (min-width: 1200px) {
  }
`;

export const Joke = () => {
  const [joke, setJoke] = useState([]);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin");
    }
  }, [accessToken, history]);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    fetch(`https://official-joke-api.appspot.com/random_joke`)
      .then((res) => res.json())
      .then((joke) => setJoke(joke))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Logo src={logo}></Logo>
      <Container>
        <JokeContainer>
          <Setup>{joke.setup}</Setup>
          <Punchline>{joke.punchline}</Punchline>
        </JokeContainer>
        <ImageContainer>
          <Image src={jokepic}></Image>
          <JokeButton buttonText="Get new joke" onClick={fetchJoke} />
        </ImageContainer>
      </Container>
      <Footer
        footerText="Tired of our jokes?"
        linkText="Sign Out"
        linkTo="/signin"
        onClick={() => dispatch(user.actions.setLogOut())}
      />
    </>
  );
};
