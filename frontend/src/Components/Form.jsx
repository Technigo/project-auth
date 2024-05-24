import PropTypes from "prop-types";
import { useState } from "react";
import "./Form.css";
import Lottie from 'lottie-react'
import loading from '../assets/orange-loading.json'
import success from '../assets/success-animation.json'



// export const verifyAccessToken = ({ isLoggedIn, setIsLoggedIn }) => {
//   if (
//     getAccessToken() &&
//     getAccessToken() === !undefined &&
//     getAccessToken() === !null
//   ) {
//     console.log("FOUND ACCESS TOKEN");
//     setIsLoggedIn(true);
//   } else {
//     console.log("found nothing... sadness devours me...", getAccessToken());
//     setIsLoggedIn(false);
//   }
//   console.log(getAccessToken());
//   console.log("Verified access token: ", isLoggedIn);

//   return isLoggedIn;
// };

export const Form = ({
  username,
  setUsername,
  action,
  isRegistered,
  setIsRegistered,
  isLoggedIn,
  setIsLoggedIn
}) => {
  const [password, setPassword] = useState("");
 
  const [usernameLengthCheck, setUsernameLengthCheck] = useState(true);
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);
  const [displayMessageState, setDisplayMessageState] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const REGISTER_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/register";

  const LOGIN_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/login";

  const handleSubmit = (event) => {
    console.log("Form name:", action);
    event.preventDefault();

    if (action === "Sign Up") {
      setIsLoading(true)
      handleRegistration();
    }

    if (action === "Log In") {
      setIsLoading(true)
      handleSignIn();
    }
    setUsername("");
    setPassword("");
  };

  const handleRegistration = () => {
    // Register a new user

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(REGISTER_URL, fetchOptions)
      .then((res) => res.json())
      .then((loggedIn) => {
        setIsLoading(false)
        setIsRegistered(true);
        console.log(loggedIn.message);
        setDisplayMessageState(loggedIn.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    // Sign in user
    //Can we call both fetchOptions? If yes because the same do we only need it once?

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(LOGIN_URL, fetchOptions)
      .then((res) => res.json())
      .then((loggedIn) => {
        setIsLoading(false)
        setDisplayMessageState(loggedIn.message);
        setIsLoggedIn(true);
        console.log("Accesstoken log in username:", loggedIn.username);
        localStorage.setItem("access_token", loggedIn.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length >= 4) {
      setUsernameLengthCheck(false);
    } else {
      setUsernameLengthCheck(true);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordLengthCheck(false);
    } else {
      setPasswordLengthCheck(true);
    }
  };

  let disableButton = true;
  if (usernameLengthCheck === true || passwordLengthCheck === true) {
    disableButton = true;
  } else {
    disableButton = false;
  }

  console.log("Display Message State: ", displayMessageState);

  //Do we need a different form because we don't need handleUsername &PW for the login...
  return (
    <>
       {isLoading ? (
  <div className="loading">
    <Lottie
      animationData={loading}
      loop
      autoPlay
      style={{ width: 200, height: 200 }}
    /><h4>Loading ...</h4>
  </div>
    ) : isRegistered ? (
      <div className="success">
      <Lottie
      animationData={success}
      loop="false"
      autoPlay
      style={{ width: 200, height: 200 }}
    />
      {displayMessageState}
      </div>
    ) : (
        // "Registration Submitted"
        <form>
          {action} <span>Form</span>
          <li>
            <label>Username:</label>
            <input value={username} onChange={handleUsername} />
          </li>
          <li>
            <label>Password:</label>
            <input value={password} type="password" onChange={handlePassword} />
          </li>
          <button
            action="Submit"
            type="submit"
            disabled={disableButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

Form.propTypes = {
  action: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  isRegistered: PropTypes.bool,
  setIsRegistered: PropTypes.func,
};
