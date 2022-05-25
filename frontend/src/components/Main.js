import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  const signOut = () => {
    dispatch(user.actions.setError(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUserName(null));
  };

  return (
    <>
      <h1>this is Main</h1>
      <button type='submit' onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
};

export default Main;
