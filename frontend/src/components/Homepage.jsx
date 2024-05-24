import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import "../styles/Homepage.css";
import homeAnimation from "../assets/home-animation.json";

export const Homepage = () => {
  return (
    <>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/signup">Sign up</Link>
          </li>
          <li className="menu-item">
            <Link to="/login">Log in</Link>
          </li>
          <li className="menu-item">
            <Link to="/secrets">Secrets</Link>
          </li>
        </ul>
      </nav>
      <Lottie
        animationData={homeAnimation}
        loop={true}
        className="homeAnimation"
      />
    </>
  );
};
