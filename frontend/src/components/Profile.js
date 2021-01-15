import React, { useSelector } from 'react';

import Lottie from 'react-lottie';
import animationData from '../lotties/38825-robot-hello.json';
// Animation by Mohamed Achraf El Ghayani on Lottiefiles: https://lottiefiles.com/38825-robot-hello#
import {ProfileText, CredText } from 'styling/styling';

export const Profile = () => {
  // const statusMessage = useSelector(store => store.user.statusMessage);
 // const name = useSelector(store => store.user.name);
  // const isLoggedIn = useSelector(store => store.user.login.statusMessage);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <ProfileText>Welcome! Your're logged in.</ProfileText>
        <Lottie
          options={defaultOptions}
          height={300}
          width={250} 
        />
        <CredText>Animation by Mohamed Achraf El Ghayani on Lottiefiles</CredText>
    </>
  )
}
