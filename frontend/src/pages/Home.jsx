import SignOutButton from "../components/SignOutButton";
import Lottie from "lottie-react";
import animation from "../assets/animation/Animation.json";
import Adverts from "../sections/Adverts";

const Home = () => {
  // Create settings for animation
  const options = {
    animationData: animation,
    style: {
      height: 250
    },
    loop: true,
    autoplay: true
  }

  return (
    <div>
      <div className="button-wrapper">
        <SignOutButton />
      </div>
      <h1>Welcome to the world of secrets!</h1>
      <Lottie 
        animationData={options.animationData} 
        style={options.style} 
        loop={options.loop} 
        autoplay={options.autoplay} 
      />
      <Adverts />
    </div>
  );
};

export default Home;