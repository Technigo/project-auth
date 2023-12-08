import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userStore } from "../stores/userStore";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpMode, setSignUpMode] = useState(true);

  const navigate = useNavigate();

  const storeHandleSignup = userStore((state) => state.handleSignUp);
  const storeHandleLogin = userStore((state) => state.handleLogIn);

  // Handle value change in the fields
  const handleSignUpChange = (e) => {
    setSignUpMode(e.target.value);
  };

  const handleLoginChange = (e) => {
    setSignUpMode(!e.target.value);
  }

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  // Handle form submission via "SIGN UP" or "LOG IN" buttons
  const onSignUpClick = async (e) => {
    e.preventDefault();

    await storeHandleSignup(username, password, email);
    if (username && password && email) {
      navigate("/home");
    }
  };

  const onLogInClick = async (e) => {
    e.preventDefault();

    await storeHandleLogin(username, password);
    if (username && password) {
      navigate("/home");
    }
  };

  return (
    <div>
      <form>
        <h1>Welcome to GreenBuddy</h1>
        
        <div>
          <label htmlFor="signup">Sign up</label>
          <input type="radio" name="what-to-do" id="signup" value={signUpMode} onChange={handleSignUpChange} />
          <label htmlFor="login">Log in</label>
          <input type="radio" name="what-to-do" id="login" value={signUpMode} onChange={handleLoginChange}/>
        </div>
        
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} placeholder="John Doe" onChange={handleUserNameChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} placeholder="******" onChange={handlePasswordChange} />
        </div>
        
        {signUpMode ? (
          <div>
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" value={email} placeholder="john@gmail.com" onChange={handleEmailChange} />
          </div>
        ) : null}

        <button type="submit" onClick={signUpMode ? onSignUpClick : onLogInClick}>
          {signUpMode ? "SIGN UP" : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default Form;