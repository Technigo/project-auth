import React from "react";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

export const Login = () => {
  return (
    <>
      <div className="bodyContainer">
        <h2>Welcome back </h2>
        <p>LOGIN TO YOUR ACCOUNT</p>
        <form className="formContainer" onSubmit={handleLogin}>
          <p>
            User Name: &nbsp;
            <textarea
              rows="1"
              cols="40"
              placeholder="user name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </p>
          <p>
            Password: &nbsp;
            <textarea
              rows="1"
              cols="40"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <button className="buttons" type="submit">
            Log in
          </button>
        </form>
        <div>
          DISPLAY RESULTS HERE
          <p>
            <button className="buttons" type="submit">
              Log out
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
