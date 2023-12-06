import Lottie from "lottie-react";
import TopSecret from "./assets/animation/Animation - 1701879216835.json";

export const TopSecretAnimation = () => {
  const options = {
    animationData: TopSecret,
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
