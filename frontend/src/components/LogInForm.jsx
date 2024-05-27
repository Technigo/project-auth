import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogInForm = () => {
  const [logInData, setlogInData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setlogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://project-authentication-6r12.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed at logging in...");
      }

      const data = await response.json();
      console.log("User logged in:", data);

      //save the accessToken to localStorage
      localStorage.setItem("accessToken", data.accessToken);

      setlogInData({
        email: "",
        password: "",
      });

      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={logInData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={logInData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In!</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};
