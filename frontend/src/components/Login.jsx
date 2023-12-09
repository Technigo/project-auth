import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const navigateToPage = useNavigate();

  //API TO TEST ON LOCAL HOST
  //const myAPI = "http://localhost:8000";
  //API FOR DEPLOYED BACKEND
  const myAPI = "https://project-auth-0x8y.onrender.com";

  //----Function to handle sign up button click----//
  const onLoginClick = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please enter a username and password");
      return;
    }

    const info = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    await fetch(`${myAPI}/login`, info)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((newUser) => {
        console.log(newUser);
        setIsLoggedin(true);
      })
      .catch((error) => {
        console.log(error);
        alert("User doesnt not exist, try again");
        setIsLoggedin(false);
      });
  };

  const onLogoutClick = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setIsRegistered(false);
    localStorage.removeItem("accessToken");
    console.log("entered onlogoutclick");
    navigateToPage("/");
  };

  const onReturnHomeClick = () => {
    navigateToPage("/");
  };

  return (
    <>
      <div className="bodyContainer">
        <h2>Welcome back </h2>
        <p>LOGIN TO YOUR ACCOUNT</p>
        <form className="formContainer" onSubmit={onLoginClick}>
          {!isLoggedin && (
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
                Password: &nbsp;
                <textarea
                  rows="1"
                  cols="40"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <button className="buttons" type="submit">
                Log in
              </button>
            </>
          )}
        </form>
        <div></div>
        <div>
          {isLoggedin && (
            <>
              <p>Welcome back!</p>
              <p>{username}, you are now logged in.</p>
              <button className="buttons" onClick={onReturnHomeClick}>
                Home
              </button>
              <button className="buttons" onClick={onLogoutClick}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
