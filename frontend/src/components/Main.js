import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import user from 'reducers/user';

import Confetti from 'react-confetti';
import DateTimeDisplay from 'countdowntimer/DateTimeDisplay';

import { 
  Wrapper,
  Title,
  SignOutButton
} from "./main_style"


const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
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
    <Wrapper>
      <Title>It is the final countdown!!!</Title>
      <SignOutButton type='submit' onClick={() => signOut()}>
        Sign out
      </SignOutButton>
      <DateTimeDisplay />
      <Confetti></Confetti>
    </Wrapper>
  );
};

export default Main;
