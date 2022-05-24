import React, { useState } from "react";

export const Login = () => {
  const [user, setUser] = useState("");

  return (
    <form className="user-input">
      <h1>Login here!</h1>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button>Log in</button>
    </form>
  );
};

//Connect this page to login-backend
