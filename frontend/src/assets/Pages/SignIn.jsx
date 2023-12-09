import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <div>
      <form className="login-form">
        <h1>Login to Your Account</h1>
        <label className="username">
          UserName:
          <input type="text" name="username" />
        </label>
        <br />
        <label className="pw">
          Password:
          <input type="text" name="password" />
        </label>
        <br />
        <button>Sign In</button>
        <h5>Haven't sign up as member yet?</h5>
        <Link to="/">HOME</Link>
        <Link to="/register">Sign up</Link>
      </form>
    </div>
  );
};

export default SignIn;
