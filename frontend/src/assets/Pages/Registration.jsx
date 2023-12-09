import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div>
      <div>
        <h2>Sign up to receive the latest promotion!</h2>
      </div>
      <form className="login-form">
        <label className="username">
          UserName:
          <input type="text" name="username" />
        </label>
        <br />
        <label className="pw">
          Password:
          <input type="text" name="password" />
        </label>
        <button>Sign up</button>
      </form>
      <h5>Already a user?</h5>
      <Link to="/">HOME</Link>
      <Link to="/signin">LOGIN</Link>
    </div>
  );
};

export default Registration;
