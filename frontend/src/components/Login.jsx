import React from "react";
import { useState, useEffect } from "react";

export const Login = () => {
  const [login, setLogin] = useState("");

  const handleSignIn = () => {
    //what happens once sign in button is clicked
  };

  return (
    <>
      <div>
        <h2>Already registered? </h2>
        <p>Sign In Here:</p>
        <form onSubmit={handleSignIn}>
          <p>
            User name:
            <textarea
              rows="1"
              cols="50"
              placeholder="user name"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </p>
          <p>
            Password:
            <textarea rows="1" cols="50" placeholder="password" />
          </p>
          <button className="buttons" type="submit">
            Log in
          </button>
        </form>
      </div>
      <div>DISPLAY RESULTS HERE</div>
    </>
  );
};
