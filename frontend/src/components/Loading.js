import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import styled from 'styled-components/macro';
import tigerAnimation from '../assets/tigerAnimation.json';

export const Loading = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LottieWrapper>
      <div className="container">
        <Player
          loop={!isAnimationComplete}
          autoplay={!isAnimationComplete}
          src={tigerAnimation}
          className="lottie"
          speed={1}
          onComplete={() => {
            setTimeout(() => {
              setIsAnimationComplete(true);
            }, 10000);
          }}
        />
      </div>
    </LottieWrapper>
  );
};

const LottieWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  .lottie {
    height: 40vh;
    width: 40vw;
  }
`;
