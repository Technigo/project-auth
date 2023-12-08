import Lottie from "lottie-react";
import shiba from "../animations/Animation - 1702063538486.json";

export const LottieComp = () => {
    const style = {
        minWidth: 200,
        maxWidth: 600,
        padding: 40,
    }
  return <Lottie animationData={shiba} style={style} />;
};
