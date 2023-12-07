import React from "react";

export const RegisterForm = () => {
  return (
    <div>
      <form className="register-form">
        <label htmlFor="userName">Username</label>
        <input type="text" id="userName" placeholder="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="email" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// A registration form.
// A sign-in form.
// A page to show the authenticated content from the API.
// A 'sign out' button that removes the saved access token and redirects the user to the login form.
