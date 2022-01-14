import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from './Cat';

import styled from 'styled-components';

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-shadow: 5px 5px #e81818;
  font-family: 'Dongle', sans-serif;

  @media (max-width: 820px) {
    height: 80vh;
  }
`;

const Svg = styled.svg`
  fill: currentColor;
  height: auto;
  max-width: 80vmin;
  transform-origin: center;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 1;
  transform: rotate(20deg);
`;

const LottieDiv = styled.div`
  padding-top: 20px;
  position: absolute;
  width: 100%;
  align-items: center;
`;

const EnterText = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Dongle', sans-serif;
  font-size: 22px;

  a {
    color: red;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Gif = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  height: 300px;
  width: auto;
`;

const Start = () => {
  return (
    <div>
      <TextContainer>
        <Svg viewBox='0 0 100 100' width='500' height='500'>
          <defs>
            <path
              id='circle'
              d='
        M 50, 50
        m -37, 0
        a 37,37 0 1,1 74,0
        a 37,37 0 1,1 -74,0'
            />
          </defs>
          <text fontSize='24'>
            <textPath xlinkHref='#circle'>
              The - secret - cat - society -
            </textPath>
          </text>
        </Svg>
        <Gif src='https://embed.lottiefiles.com/animation/57071'></Gif>
        <LottieDiv>{/* <Lottie /> */}</LottieDiv>
      </TextContainer>
      <EnterText>
        click <Link to='/signup'>here </Link> to sign up or sign in
      </EnterText>
    </div>
  );
};
export default Start;
