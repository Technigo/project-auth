import React from "react";
import { useState } from "react";

export const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  //----- Function to process the login -----//
  const handleLogin = async (event) => {
    if (!userName || !password) {
      alert("Plase enter both username and password");
      return;
    }
    //what happens once sign in button is clicked
    const text = {
      method: "POST",
      body: JSON.stringify({
        name: `${userName}`,
        password: `${password}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorisation: localStorage.getItem("accessToken"),
      },
    };

    await fetch("mongodb://127.0.0.1:27017/auth", text)
      .then((response) => response.json())
      .then(newUser);
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
            <textarea
              rows="1"
              cols="50"
              placeholder="USER NAME"
              value={userName}
              onChange={(e) => setLogin(e.target.value)}
            />
          </p>
          <p>
            <textarea rows="1" cols="50" placeholder="PASSWORD" />
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
