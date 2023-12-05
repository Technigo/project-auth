import React from "react";
import { useState } from "react";

export const Register = () => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");

  //add my API link here

  //----Function to handle sign up button click----//

  const handleRegistration = async (event) => {
    //what happens once sign in button is clicked
    // if (!userName || !password || !email) {
    //   alert("Please enter an email, username and password");
    //   return;
    const options = {
      method: "POST",
      body: JSON.stringify({
        name: `${userName}`,
        email: `${userEmail}`,
        password: `${password}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorisation: localStorage.getItem("accessToken"),
      },
    };

    await fetch("mongodb://127.0.0.1:27017/auth", options)
      .then((response) => response.json())
      .then((newUser) => {
        alert(newUser, `You have registered successfully`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        <h2>Create a new account and sign up here!</h2>
        <p>Enter your new details:</p>
        <form onSubmit={handleRegistration}>
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
          <button
            className="buttons"
            type="submit"
            onClick={handleRegistration}
          >
            Sign up!
          </button>
        </form>
      </div>
      <div>DISPLAY RESULTS HERE</div>
    </>
  );
};
