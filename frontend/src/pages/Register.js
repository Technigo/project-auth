import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./RegisterStyle.css";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const onFormSubmit = () => {
    console.log("onFormSubmit");
  };

  return (
    <>
      <div className='form-wrapper'>
        <div className='form-container'>
          <div className='pink-circle'></div>
          <div className='blue-circle'></div>
          <div className='green-circle'></div>
          <form className='form' onSubmit={onFormSubmit}>
            <h2>Sign up here</h2>
            <label>Full name</label>
            <input
              className='input'
              placeholder='Username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='input'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='signup-button' type='submit'>
              Sign up
            </button>
          </form>
        </div>
        <div className='member-container'>
          <p>
            Already a member? <b>Login here</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
