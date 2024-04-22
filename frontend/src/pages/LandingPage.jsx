import { Login } from "../components/LogIn";
import { SignUp } from "../components/SignUp";

export const LandingPage = () => {
  return (
    <>
      <div className="login-container">
        <p>Please login:</p>
        <Login />
      </div>

      <div className="signup-container">
        <p>No account?</p>
        <p>Please sign up:</p>
        <SignUp />
      </div>
    </>
  );
};
