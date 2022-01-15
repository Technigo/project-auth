import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { API_URL } from "utils/constants";
import { useNavigate } from "react-router-dom";
import user from "../reducer/user";
import background from "../images/background.jpg";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response.error));
          });
        }
      });
  };

  return (
    <article>
      <section className="imageContainer">
        <img src={background} alt="background" aria-hidden="true" />
      </section>

      <section className="contentContainer">
        <form onSubmit={onFormSubmit}>
          <section className="radioBtnContainer">
            <label htmlFor="signup">Sign up</label>
            <input
              id="signup"
              type="radio"
              checked={mode === "signup"}
              onChange={() => setMode("signup")}
            />
            <label htmlFor="signin">Sign in</label>
            <input
              id="signin"
              type="radio"
              checked={mode === "signin"}
              onChange={() => setMode("signin")}
            />
          </section>

          <section className="inputContainer">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </section>
          <section className="btnContainer">
            <button type="submit">Submit</button>
          </section>
        </form>

        <section className="errorContainer">
            {error ? `Password must be 5 characters or longer` : ``}
        </section>
      </section>
    </article>
  );
};
