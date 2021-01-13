import React from 'react';
import styled from 'styled-components';

/* Cred, måste ligga i typ en footer eller nånstans på profilsidan sen: 
Animation by Mohamed Achraf El Ghayani on Lottiefiles
https://lottiefiles.com/38825-robot-hello# 
*/

import Lottie from 'react-lottie';
import animationData from '../lotties/38825-robot-hello.json';

export const Profile = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
        <ProfileBackground>
          <ProfileText>Welcome! Your're logged in.</ProfileText>
          <Lottie
            options={defaultOptions}
            height={250}
            width={200} 
          />
        </ProfileBackground>
      )
    }

/* Styling for profile */
const ProfileBackground = styled.div`
 background: #fefefe;
 height: 100vh;
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const ProfileText = styled.p`
 color: #000;
 font-size: 22px;
 margin-bottom: 20px;
`;