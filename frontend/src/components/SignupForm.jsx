import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackHome } from "./BackHome";

export const SignupForm = () => {
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
    console.log(formData);

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
      if (!response.ok) throw new Error("Signup failed");
      const userData = await response.json();
      console.log("successful", userData);
      navigate("/secrets");
      localStorage.setItem("accessToken", JSON.stringify(userData.accessToken));
    } catch (error) {
      console.error("Error", error);
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
    </>
  );
};
