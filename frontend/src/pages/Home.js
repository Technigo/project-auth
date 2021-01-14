import React from 'react';
import { useSelector } from 'react-redux';

//import user from './reducer/user';
import { LoginForm } from '../components/LoginForm';
import { Profile } from '../components/Profile';

export const Home = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);

  return <>{accessToken ? <Profile /> : <LoginForm />}</>;
};
