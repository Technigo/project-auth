import React from 'react';
import { Link } from 'react-router-dom';

import SignedInContent from './SignedInContent';

const SignIn = () => {
  return (
    <div>
      <h1>sign in</h1>
      <form>
        <label>username</label>
        <input type='text' placeholder='enter username' />
        <label>password</label>
        <input type='password' placeholder='enter password' />
        <button>sign in</button>
      </form>
      <p>not a member?</p>
      <Link to='/signup'>Sign up</Link>

      {/* <SignedInContent /> */}
    </div>
  );
};
export default SignIn;
