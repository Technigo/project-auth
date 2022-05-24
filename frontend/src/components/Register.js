import React from "react";

export const Register = () => {
  return (
    <form className="user-input">
      <h1>Register here!</h1>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button>Register</button>
    </form>
  );
};

//Connect this page to register-backend
