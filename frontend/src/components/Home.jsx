import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>Please select an option:</p>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;