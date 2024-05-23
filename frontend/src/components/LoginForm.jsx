import { useState } from "react";
import { BackHome } from "./BackHome";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(loginData);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      console.log(response);
      if (!response.ok) throw new Error("Failed to login");

      navigate("/secrets");
    } catch (error) {
      console.error("Error", error);
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
    </>
  );
};
