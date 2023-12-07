import React from "react";

export const LoginForm = () => {
  return (
    <div>
      <form className="login-form">
        <label htmlFor="userName">Username</label>
        <input type="text" id="userName" placeholder="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" required />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};