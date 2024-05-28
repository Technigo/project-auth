import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const signup = apiKey + "/signup";
  const exist = apiKey + "/exists";

  const handleRegistration = (event) => {
    event.preventDefault();

    // First check if the user already exists because brainfog is a post-covid vibe, and people have to many accounts and things going on in their lives to remember everything
    fetch(exist, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          // If the user exists, we alert them, and redirect them to the login page because we are super helpful but not patronizing
          alert("Woops! You already have an account you silly goose 🪿, Let's redirect you to our loginpage.");
          navigate("/login");
        } else {
          // If the user does not exist silent celebrate our new member🥳 then play it cool and nonchalant,  and proceed with the registration
          fetch(signup, {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Unable to register. Please try again.");
              }
              return res.json();
            })
            .then(() => {
              setMessage("Registration successful! Please sign in.");
              navigate("/login");
            })
            .catch((err) => {
              setMessage(err.message);
            });
        }
      })
      .catch(() => {
        setMessage("An error occurred while checking if user exists");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegistration}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}

    </div>
  );
}
