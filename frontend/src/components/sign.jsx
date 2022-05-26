import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./sign.module.css";

const SignIn = ({ authService, pageRouter }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  // [note] onSubmit func has two cases - signup || login
  const onSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      // case 1. sign up

      // step 1. username validation
      const reg = "^[A-Za-z0-9_]{3,12}$";
      const regex = new RegExp(reg);

      if (regex.test(username)) {
        // step 2. check password
        if (password === confirmPassword) {
          authService
            .signup(username, password, email)
            .then((data) => {
              if (data.message) {
                throw new Error(data.message);
              } else {
                pageRouter();
              }
            })
            .catch((err) => toast(err.message));
        } else {
          toast.error("Password is not match");
        }
      } else {
        // step 1-1. display erorr message
        const noSpace = /^[A-Za-z0-9_]+$/;
        if (!username.match(noSpace)) {
          toast.error(
            "Username cannot contain white space or special characters except _"
          );
        } else {
          toast.error("Username should be between 3 to 12 characters");
        }
      }
    } else {
      // case 2. login
      authService
        .login(username, password)
        .then((data) => {
          if (data.message) {
            throw new Error(data.message);
          } else {
            pageRouter();
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "confirmPassword":
        return setConfirmPassword(value);
      case "email":
        return setEmail(value);
      case "signup":
        return setSignup(checked);
      default:
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.itemContainer}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            value={username}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.itemContainer}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
          />
        </div>

        {signup && (
          <>
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                className={styles.input}
                value={confirmPassword}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="password">
                email
              </label>
              <input
                className={styles.input}
                value={email}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className={styles.submit}>
          {signup ? "Sing up" : "Log in"}
        </button>

        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            id="signup"
            name="signup"
            onChange={onChange}
            checked={signup}
          />
          <label className={styles.checkboxLabel} htmlFor="signup">
            create new account
          </label>
        </div>
      </form>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default SignIn;
