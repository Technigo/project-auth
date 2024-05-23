import PropTypes from "prop-types";
import { useState } from "react";

export const Form = ({ action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [usernameLengthCheck, setUsernameLengthCheck] = useState(true);
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);

  const REGISTER_URL =
    "https://project-auth-moonlight-flamingos.onrender.com/register";

  const handleSubmit = (event) => {
    console.log("Form name:", action);
    event.preventDefault();

    // Register a new user

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(REGISTER_URL, fetchOptions)
      .then((res) => res.json())
      .then((loggedIn) => {
        setAccess(loggedIn.accessToken);
        console.log(access);
      })
      .catch((error) => {
        console.log(error);
      });

    setUsername("");
    setPassword("");
  };

  const handleUsername = (e) => {
    console.log("Username: ", e.target.value);
    setUsername(e.target.value);
    if (username.length <= 4) {
      setUsernameLengthCheck(true);
    } else {
      setUsernameLengthCheck(false);
    }
  };

  const handlePassword = (e) => {
    console.log("PW: ", e.target.value);
    setPassword(e.target.value);
    if (password.length <= 8) {
      setPasswordLengthCheck(true);
    } else {
      setPasswordLengthCheck(false);
    }
  };

  return (
    <div>
      {action} <span>Form</span>
      <form>
        <label>Username:</label>
        <input value={username} onChange={handleUsername} />
        <label>Password:</label>
        <input value={password} onChange={handlePassword} />
        <button
          action="Submit"
          type="submit"
          disabled={usernameLengthCheck || passwordLengthCheck}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  action: PropTypes.string,
};
