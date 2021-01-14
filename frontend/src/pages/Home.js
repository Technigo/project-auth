import React from 'react';
import { useSelector } from 'react-redux';

//import user from './reducer/user';
import { SignUpForm } from '../components/SignUpForm';
import { Profile } from '../components/Profile';

export const Home = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);
  console.log(accessToken);

  return <>{accessToken ? <Profile /> : <SignUpForm />}</>;
};
