import React from 'react';
import { useSelector } from 'react-redux';

import { FormLogin } from './FormLogin';
import { Profile } from './Profile';

export const LandingPage = () => {
  const accessToken = useSelector(store => store.user.login.accessToken);

  return <>{accessToken ? <Profile /> : <FormLogin/>}</>;


};