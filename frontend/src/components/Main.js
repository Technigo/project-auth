import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import user from '../reducers/user';

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem('user');
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <div>
        <Link to='/login'>To '/login' !</Link>
      </div>
      <h1>It's a secret!</h1>
      <button className='button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
