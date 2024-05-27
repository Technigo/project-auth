import { useState } from "react";

export const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://project-authentication-6r12.onrender.com/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed at creating the account...");
      }

      const data = await response.json();
      console.log("User registered:", data);

      setRegistrationData({
        name: "",
        email: "",
        password: "",
      });

      setMessage("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={registrationData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registrationData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up!</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};
