import React from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SECRET_URL = 'http://localhost:8080/secrets';

export const Secret = () => {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.login.name);

  const logout = () => {
    dispatch(user.actions.logout());
  };

  return (
    <div>
      <h1>{`Hi ${name}!`}</h1>
      <Link to='/'>
        <input type="submit" onClick={logout} value="Logout" />
      </Link>
    </div>
  );
};