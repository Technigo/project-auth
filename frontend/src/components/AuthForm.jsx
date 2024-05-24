import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackHome } from "./BackHome";

import "../styles/AuthForm.css";

const AuthForm = ({ login }) => {
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
    setMessage(null);
    try {
      const response = await fetch(
        `https://project-auth-lh3p.onrender.com/${login ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      setMessage(data.message);
      localStorage.setItem("access_token", JSON.stringify(data.accessToken));
      console.log("successful", data);
      setTimeout(() => {
        navigate(`/${login ? "secrets" : "login"}`);
      }, 2000);
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
      <form onSubmit={handleSubmit} className="form">
        <label className="form-item">
          Username:
          <input
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        {!login && (
          <label className="form-item">
            Email:
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        )}
        <label className="form-item">
          Password:
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">
          {login ? "Log in" : "Sign up"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  login: PropTypes.bool,
};
