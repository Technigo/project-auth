import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackHome } from "./BackHome";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    console.log(loginData);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://project-auth-lh3p.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      console.log(response);
      console.log("succesful", response);
      const userData = await response.json();
      if (!userData.success) throw new Error(userData.error);
      navigate("/secrets");
      localStorage.setItem("accessToken", JSON.stringify(userData.accessToken));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoginData({
        username: "",
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
            id=""
            value={loginData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            id=""
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
