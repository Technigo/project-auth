import { Link } from "react-router-dom";
import "./login.css";
const Home = () => {
  return (
    <div>
      <div className="home-page">
        <h1>
          ✨ Login to use our generator to pick a gift for your beloved one! 👇
        </h1>
        <div>
          <Link to="/signin">
            <button className="signin-btn">Log In</button>
          </Link>

          <h1>Not registered? Become a memeber now!</h1>
          <Link to="/register">
            <button className="register-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
