import React from "react";

export const RegisterForm = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  onSignUpClick,
}) => {
  return (
    <div>
      <form className="register-form">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <button onClick={onSignUpClick}>
          Register
        </button>
      </form>
    </div>
  );
};

// A registration form.
// A sign-in form.
// A page to show the authenticated content from the API.
// A 'sign out' button that removes the saved access token and redirects the user to the login form.
