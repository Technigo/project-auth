import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//NOTE didn't use Zustand to store info, this confused me a lot! I need to spend more time learning global state management

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const navigateToPage = useNavigate();

  //API TO TEST ON LOCAL HOST
  //const myAPI = "http://localhost:8000";
  //API FOR DEPLOYED BACKEND
  const myAPI = "https://project-auth-0x8y.onrender.com/";

  //----Function to handle sign up button click----//
  const onSignupClick = async (event) => {
    event.preventDefault();

    if (!username || !password || !email) {
      alert("Please enter an email, username and password");
      return;
    }

    const info = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    };

    await fetch(`${myAPI}/register`, info)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((newUser) => {
        console.log(newUser);
        setIsRegistered(true);
      })
      .catch((error) => {
        console.log(error);
        alert("User already exists, please try again");
        setUsername("");
        setPassword("");
        setEmail("");
        setIsRegistered(false);
      });
  };

  const onReturnHomeClick = () => {
    navigateToPage("/");
  };

  const onSignOutClick = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setIsRegistered(false);
    localStorage.removeItem("accessToken");
    navigateToPage("/");
  };

  return (
    <>
      <div className="bodyContainer">
        <h2>Want to join? </h2>
        <p>CREATE AN ACCOUNT</p>
        <form className="formContainer">
          {!isRegistered && (
            <>
              <p>
                User Name: &nbsp;
                <textarea
                  rows="1"
                  cols="40"
                  placeholder="user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
              <p>
                Email: &nbsp;
                <textarea
                  rows="1"
                  cols="40"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                Password: &nbsp;
                <textarea
                  rows="1"
                  cols="40"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <button className="buttons" type="submit" onClick={onSignupClick}>
                Sign Up!
              </button>
            </>
          )}
        </form>
        <div>
          {isRegistered && (
            <>
              <p>Welcome!</p>
              <p>{username}, you are now registered.</p>
              <button className="buttons" onClick={onReturnHomeClick}>
                Home
              </button>
              <button className="buttons" onClick={onSignOutClick}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
