import React from "react";
import { useState, useEffect } from "react";

export const Register = () => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");

  //store the sign up information
  //const storeSignUp = useStore((state) => state.handleSignUp);

  //function to handle sign up button click
  const handleSignupClick = async () => {
    // if (!userName || !password || !email) {
    //   alert("Please enter an email, username and password");
    //   return;
  };

  return (
    <>
      <div>
        <h2>Create a new account and sign up here!</h2>
        <p>Enter your new details:</p>
        <form onSubmit={handleSignupClick}>
          <p>
            User Name:
            <textarea
              rows="1"
              cols="50"
              placeholder="user name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </p>
          <p>
            Email:
            <textarea
              rows="1"
              cols="50"
              placeholder="email"
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
            />
          </p>
          <p>
            Password:
            <textarea
              rows="1"
              cols="50"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <button className="buttons" type="submit" onClick={handleSignupClick}>
            Sign up!
          </button>
        </form>
      </div>
      <div>DISPLAY RESULTS HERE</div>
    </>
  );
};
