import React from "react";
import { useState } from "react";
//import { useUserStore } from "../stores/useUserStore";
//import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  //const navigate = useNavigate();

  //----Function to handle sign up button click----//
  //const storeHandleSignup = useUserStore((state) => state.SignupNewUser);

  //const myAPI = "https://mongodb://127.0.0.1:27017/project-auth";

  const myAPI = "http://localhost:8000";

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
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        alert(`You have registered successfully`);
        //PUT CODE HERE for what happens once there was a successful registration.
        setIsRegistered(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bodyContainer">
        <h2>Want to join? </h2>
        <p>CREATE AN ACCOUNT</p>
        <form className="formContainer">
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
            Sign up!
          </button>
        </form>
        <div>{isRegistered && <p>display results here</p>}</div>
      </div>
    </>
  );
};
