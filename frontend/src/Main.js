import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import car from "./videos/car.mp4";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Video = styled.video`
  object-fit: cover;
`;

const Middle = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
`;

export const Main = () => {
  const history = useHistory();
  return (
    <Container>
      <Video autoPlay playsinline muted loop>
        <source src={car} type="video/mp4"></source>
        "Your browser is not supported!"
      </Video>
      <Middle>
        <button onClick={() => history.push("/login")}>Login</button>
        <button onClick={() => history.push("/register")}>Register</button>
      </Middle>
    </Container>
  );
};
