import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import CountdownTimer from '../Hooks/CountdownTimer';
import Confetti from 'react-confetti';
import styled from "styled-components"
import DateTimeDisplay from 'Hooks/DateTimeDisplay';



import { 
  Wrapper,
  Title,
  SignOutButton
} from "./main_style"


const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 /* const daysLeft = new Date().getTime();
  const fiveDaysLeft = 29 * 24 * 60 * 60 * 1000;

  const dateTimeAfterFiveDays = daysLeft + fiveDaysLeft;*/

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
      {/*<CountdownTimer targetDate={dateTimeAfterFiveDays} />*/}
      <SignOutButton type='submit' onClick={() => signOut()}>
        Sign out
      </SignOutButton>
      <DateTimeDisplay />
      <Confetti></Confetti>
    </Wrapper>
  );
};

export default Main;
