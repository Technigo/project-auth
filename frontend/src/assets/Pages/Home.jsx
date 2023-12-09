import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <h1>Log in to see the latest promotion for member</h1>
        <div>
          <Link to="/signin">
            <button className="signin">Sign In</button>
          </Link>
          <Link to="/register">
            <button className="register">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
