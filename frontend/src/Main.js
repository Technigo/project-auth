import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import water from "./videos/water.mp4";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  // opacity: 0.7;
`;

const Video = styled.video`
  object-fit: cover;
  overflow: hidden;
`;

const Middle = styled.div`
  position: absolute;
  top: 50%;
  margin-top: -50px;
  text-align: center;
  width: 100%;
`;

const Header = styled.h1`
  color: white;
  font-family: "Open Sans";
  letter-spacing: 4px;
`;

const Span = styled.span`
  display: block;
  font-size: 3rem;
  @media (min-width: 600px) {
    font-size: 4rem;
  }
`;

const Button = styled.button`
  // color: #cfac99;
  background: #a46c4d;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  width: 8rem;
  border: none;
  font-family: "Open Sans";
  letter-spacing: 1px;
  margin-right: 2rem;
  :hover {
    background: #cfac99;
  }
`;

export const Main = () => {
  const history = useHistory();
  return (
    <Container>
      <Video autoPlay playsinline muted loop>
        <source src={water} type="video/mp4"></source>
        "Your browser is not supported!"
      </Video>

      <Middle>
        <Header>
          Join our travel community!<Span>TRAVEL WITH US!</Span>
        </Header>
        <Button onClick={() => history.push("/login")}>Login</Button>
        <Button onClick={() => history.push("/register")}>Register</Button>
      </Middle>
    </Container>
  );
};
