import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackHome } from "./BackHome";

export const SignupForm = () => {
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://project-auth-lh3p.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);

      if (!response.ok) throw new Error();
      const data = await response.json();
      setMessage(data.message);
      console.log("successful", data);
      setTimeout(1000, () => {
        navigate("/login");
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <BackHome />
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign up!</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
