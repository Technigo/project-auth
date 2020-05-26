import React from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export const Secret = () => {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.login.name);
  const accessToken = useSelector((store) => store.user.login.accessToken);


  const logout = () => {
    dispatch(user.actions.logout());
  };

  if (!accessToken) {
    return <Redirect to='/' />
  } else {
    return (
      <div>
        <h1>{`Hi ${name}!`}</h1>
        <Link to='/'>
          <input type="submit" onClick={logout} value="Logout" />
        </Link>
      </div>
    );
  }
};