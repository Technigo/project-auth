import React, { useState, useEffect } from "react";
import { Register } from "./Register";
import { Login } from "./Login";

export const Main = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState(false);

  const accessToken = window.localStorage.getItem("accessToken");

  const addUser = event => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError(true);
    } else {
      setError(false);
      setSuccess(true);
    }

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(() => {
        setName(name);
        setPassword(password);
        setEmail(email);
        setName("");
        setPassword("");
        setEmail("");
      });
  };

  const loginUser = event => {
    event.preventDefault();

    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
    }

    fetch("http://localhost:8080/sessions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Your e-mail and/or password was incorrect");
        }
        return res.json();
      })
      .then(({ accessToken }) => {
        window.localStorage.setItem("accessToken", accessToken);
        window.location.reload();
        // onLoggedIn();
      })
      .catch(err => {
        console.log(err);
      });
    // .then(res => res.json())
    // .then(json => {
    //   if (json.accessToken) {
    //     setLogin(true);
    //   }
    //   if (json.notFound) {
    //     setLogin(false);
    //   }
    //   setPassword("");
    //   setEmail("");
    // });
  };

  useEffect(() => {
    fetch("http://localhost:8080/secrets", {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (!res.ok) {
          // !TODO: Handle status 401 and show error message.
        }
        return res.json();
      })
      .then(json => setMessage(json.secret));
  }, []);

  const handleSignOut = event => {
    event.preventDefault();
    window.location.reload();

    // setShowForm(true)
    // setShowContentPage(false)

    console.log("Signed out");

    window.localStorage.removeItem("accessToken");
  };

  return (
    <div>
      <button>Register</button>
      <button>Log in</button>
      <button onClick={handleSignOut}>Sign out</button>
      <Register
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClick={addUser}
      />

      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClick={loginUser}
      />
      {login && <div> You are in!</div>}
      {error && (
        <div>
          <p>Error! Try again!</p>
        </div>
      )}
      {success && <div>Thank you for your registration!</div>}
      <div>{message}</div>
    </div>
  );
};
