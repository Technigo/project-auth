import React from 'react';
import Lottie from 'react-lottie';
import animationData from './lotties/57071-cat-is-sleeping-and-rolling';

const Cat = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={350} width={350} />
    </div>
  );
};
export default Cat;
