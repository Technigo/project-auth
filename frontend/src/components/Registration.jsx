import { useState } from "react";
import "./Registration.css";
import { SignIn } from "./SignIn";

export const Registration = ({ setIsRegistering }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://auth-s0og.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        /* setIsRegistered(true); */
        setIsLoading(false);
      } else {
        setMessage(result.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset isLoading after form submission is completed
    }
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="loading-container">
          <p>Loading..</p>
        </div>
      )}
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Anna Andersson"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="anna.andersson@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password123"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <p>
          Already have an account?{" "}
          <a
            href="#"
            className="login-link"
            onClick={() => setIsRegistering(false)}
          >
            Sign in
          </a>
        </p>
        {/* <p>
          Already have an account?{" "}
          <button onClick={() => setIsRegistering(false)}>Sign In</button>
        </p> */}
      </>
    </div>
  );
};

//{isLoading ? (
//   <div className="loading-container">
//   <p>Loading thoughts...</p>
// </div>
// {loading && <h2 className="loading">Loading...</h2>}

//   return (
//     <div className="container">
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           placeholder="Anna Andersson"
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           placeholder="anna.andersson@mail.com"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           placeholder="password123"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       <p>{message}</p>
//       <SignIn />
//     </div>
//   );
// };
