import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";
import logo from "assets/logonew.png";
import jokepic from "assets/jokepic.jpg";
import { JokeButton } from "components/Buttons";
import { Footer } from "components/Footer";
import { 
  Logo, 
  MainContainer, 
  JokeContainer, 
  Setup, 
  Punchline, 
  ImageContainer, 
  Image } from '../components/StylingPages';


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
      <MainContainer>
        <JokeContainer>
          <Setup>{joke.setup}</Setup>
          <Punchline>{joke.punchline}</Punchline>
        </JokeContainer>
        <ImageContainer>
          <Image src={jokepic}></Image>
          <JokeButton buttonText="Get new joke" onClick={fetchJoke} />
        </ImageContainer>
      </MainContainer>
      <Footer
        footerText="Tired of our jokes?"
        linkText="Sign Out"
        linkTo="/signin"
        onClick={() => dispatch(user.actions.setLogOut())}
      />
    </>
  );
};
