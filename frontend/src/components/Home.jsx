import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Ready to see some more very cute kitties?</h1>
      <p>To get access to the kittens you need to log in.</p>

      <p>Already have an account?</p>
      <Link to="/login">
        <button>Login</button>
      </Link>

      <p>Need to create an account?</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Home;
