import React, { useState } from "react";

/* 
To acheieve:
- Registration form - POST to api to create new user
- Sign in form - For registration and sign in form have two buttons that have two actions that are connect to two different post requests
- Page to show authenticated content from API
- Sign out button that removes he saved access token and redirects the user to the login form. 
- Styling - make look nice and responsive.
- Deploy - heroku and netlify.
- Redux if time.
*/

const URL = "http://localhost:8080/users"; // change to Heroku-url

export const App = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // send data to backend, for saving in DB
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log("error:", err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>
          name:
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          password:
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          email:
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          SIGN UP
        </button>
      </form>
    </div>
  );
};
