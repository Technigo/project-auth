import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
      <h1>sign in</h1>
      <form>
        <label>username</label>
        <input type='text' placeholder='enter username' />
        <label>password</label>
        <input type='password' placeholder='enter password' />
        <button>register</button>
      </form>
      <p>not a member?</p>
      <Link to='/signup'>Sign up</Link>
    </div>
  );
};
export default SignIn;
