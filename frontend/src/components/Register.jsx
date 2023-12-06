import React from "react";
import { useState } from "react";
import { StoreUser } from "../stores/StoreUser";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);

  //----Function to handle sign up button click----//
  const storeHandleSignup = StoreUser((state) => state.handleSignup);

  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter an email, username and password");
      return;
    }
    try {
      await storeHandleSignup(username, password, email);
      if (username && password) {
        setIsRegistered(true);
        navigate("/");
      }
    } catch (error) {
      // Handle any errors that occur during signup
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  //NOTE the below is moved to the stores folder
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: `${username}`,
  //       email: `${email}`,
  //       password: `${password}`,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorisation: localStorage.getItem("accessToken"),
  //     },
  //   };

  //   await fetch("mongodb://127.0.0.1:27017/auth", options)
  //     .then((response) => response.json())
  //     .then((newUser) => {
  //       alert(newUser, `You have registered successfully`);
  //     })
  //     .catch((error) => console.log(error));
  // };

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
