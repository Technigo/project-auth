import Lottie from "lottie-react";
import CommunityAnimation from "./assets/animation/Animation - 1702137897744.json";

// Animation
export const Animation = () => {
  const options = {
    animationData: CommunityAnimation,
    style: {
      margin: 25,
      height: 200,
    },
    autoplay: true,
    loop: true,
  };

  return (
    <Lottie
      animationData={options.animationData}
      style={options.style}
      autoplay={options.autoplay}
      loop={options.loop}
    />
  );
};
