// import React, { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
// import { Player } from '@lottiefiles/react-lottie-player';
// import styled from 'styled-components/macro';
// import tigerAnimation from '../assets/tigerAnimation.json';

// export const Loading = () => {
//  const isLoading = useSelector((store) => store.loading.isLoading)
//   return (
//     <LottieWrapper>
//      <div className="container">
//         <Player
//           loop ={false}
//           autoplay = {true}
//           src={tigerAnimation}
//           className="lottie"
//           speed={1}
//         />
//       </div>
//     </LottieWrapper>
//   );
// };

// const LottieWrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background-color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .lottie {
//     height: 40vh;
//     width: 40vw;
//   }
// `;


import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import tigerAnimation from '../assets/tigerAnimation.json';
// import styled from 'styled-components/macro';
import { Container } from '@mui/material';

export const Loading = () => {
   const isLoading = useSelector((store) => store.loading.isLoading)
  return (
    <Container sx={{position:'absolute', zIndex:'10'}}>
      <Player
        autoplay
        className="lottie"
        src={tigerAnimation}
        speed={1}
        onStateChange={isLoading}/>
    </Container>
  )
};