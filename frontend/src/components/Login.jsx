import React from "react";
import { useState } from "react";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  //----- Function to process the login -----//
  const handleLogin = async (event) => {
    // if (!userName || !password) {
    //   alert("Plase enter both username and password");
    //   return;
    // }
    // //what happens once sign in button is clicked
    // const text = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: `${userName}`,
    //     password: `${password}`,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorisation: localStorage.getItem("accessToken"),
    //   },
    // };
    // await fetch("https://project-auth-0x8y.onrender.com/", text)
    //   .then((response) => response.json())
    //   .then(newUser);
  };

  const fetchUserInfo = async () => {
    //get info now once
  };

  return (
    <>
      <div className="bodyContainer">
        <h2>Welcome back </h2>
        <p>LOGIN TO YOUR ACCOUNT</p>
        <form className="formContainer" onSubmit={handleLogin}>
          <p>
            User Name: &nbsp;
            <textarea
              rows="1"
              cols="40"
              placeholder="user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
        </form>
        <div>
          DISPLAY RESULTS HERE
          <p>
            <button className="buttons" type="submit">
              Log out
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
