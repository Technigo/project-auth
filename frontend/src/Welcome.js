import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Body,
  Image,
  WelcomeBackground,
  TransparentButton,
  ColoredBackgroundHeader,
  Container
} from "./styles";
import boat from "./images/boat.jpg";

export const Welcome = () => {
  const [message, setMessage] = useState(false);
  let history = useHistory();
  const accessToken = window.localStorage.getItem("accessToken");

  //Authorization of the logged in user via accessToken and sending out the secret
  useEffect(() => {
    fetch("http://localhost:8080/secrets", {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (!res.ok) {
          // !TODO: Handle status 401 and show error message.
        }
        return res.json();
      })
      .then(json => setMessage(json.secret));
  }, []);

  //LOG OUT
  const handleLogOut = () => {
    window.localStorage.removeItem("accessToken");
    history.push("/login");
  };

  return (
    <Body>
      <Container>
        <WelcomeBackground>
          <Image src={boat} />
          <TransparentButton onClick={handleLogOut}>Log out</TransparentButton>
          <ColoredBackgroundHeader>{message}</ColoredBackgroundHeader>
        </WelcomeBackground>
      </Container>
    </Body>
  );
};

//Nice to have username, add also in backend.
