import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import user from "../reducers/user";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          batch(() => {
            dispatch(user.actions.setUserId(json.response.userId));
            dispatch(user.actions.setUsername(json.response.username));
            dispatch(user.actions.setAccessToken(json.response.accessToken));
            dispatch(user.actions.setError(null));
          });
          navigate("/");
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(json.response));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="usernameInput">username:</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="passwordInput">password:</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <p>
        {" "}
        Don't have the username? Please signup <Link to="/signup">
          here!{" "}
        </Link>{" "}
      </p>
    </div>
  );
};
