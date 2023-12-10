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

    // Only successfully signed-up user can see the authenticated content
    const isLoggedIn = userStore.getState().isLoggedIn;
    if (isLoggedIn) {
      navigate("/home");
    }
  };

  const onLogInClick = async (e) => {
    e.preventDefault();

    await storeHandleLogin(username, password);

    // Only successfully signed-up user can see the authenticated content
    const isLoggedIn = userStore.getState().isLoggedIn;
    if (isLoggedIn) {
      navigate("/home");
    }
  };

  return (
    <div className="form-container">
      <form>
        <h1>Welcome to GreenBuddy</h1>
        
        <div className="options">
          <div className="option">
            <label htmlFor="signup">Sign up</label>
            <input type="radio" className="radio" name="what-to-do" id="signup" value={signUpMode} onChange={handleSignUpChange} />
          </div>
          
          <div className="option">
            <label htmlFor="login">Log in</label>
            <input type="radio" className="radio" name="what-to-do" id="login" value={signUpMode} onChange={handleLoginChange}/>
          </div>
          
        </div>
        
        <div className="user-info-wrapper">
          <div className="user-info">
            <label htmlFor="username">Username</label>
            <input type="text" className="info-field" name="username" id="username" value={username} placeholder="John Doe" onChange={handleUserNameChange} />
          </div>

          <div className="user-info">
            <label htmlFor="password">Password</label>
            <input type="password" className="info-field" name="password" id="password" value={password} placeholder="******" onChange={handlePasswordChange} />
          </div>
          
          {signUpMode ? (
            <div className="user-info">
              <label htmlFor="email">Email address</label>
              <input type="email" className="info-field" name="email" id="email" value={email} placeholder="john@gmail.com" onChange={handleEmailChange} />
            </div>
          ) : null}
        </div>
        

        <button type="submit" className="button" onClick={signUpMode ? onSignUpClick : onLogInClick}>
          {signUpMode ? "SIGN UP" : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default Form;