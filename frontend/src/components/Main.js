import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import CountdownTimer from '../Hooks/CountdownTimer';

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const daysLeft = new Date().getTime();
  const fiveDaysLeft = 29 * 24 * 60 * 60 * 1000;

  const dateTimeAfterFiveDays = daysLeft + fiveDaysLeft;

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
      <h1>It is the final countdown!!!</h1>
      <CountdownTimer targetDate={dateTimeAfterFiveDays} />
      <button type='submit' onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
};

export default Main;
