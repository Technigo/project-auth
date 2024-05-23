import { Link } from "react-router-dom";
import { FaLongArrowAltDown } from "react-icons/fa";
import "../styling/Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeIntro">
        <h1 className="homeTitle">Ready to see some very cute kitties?</h1>
        <div className="homeSection">
          <img
            src="/public/homeKitten.jpg"
            alt="cute kitten"
            className="homeImage"
          />
          <p className="homeText">
            "A cat will do what it wants, when it wants, and there is not a
            thing you can do about it"
          </p>
        </div>
      </div>

      <div className="arrowIcon">
        <FaLongArrowAltDown />
      </div>

      <div className="homeAccount">
        <p className="accountIntro">
          To get access to the kittens you need to log in.
        </p>
        <p className="AccountText">Already have an account?</p>
        <Link to="/login">
          <button className="accountButton">Login</button>
        </Link>

        <p className="accountText">Need to create an account?</p>
        <Link to="/register">
          <button className="accountButton">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
