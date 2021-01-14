import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import user from '../reducers/user';
import { SignUpForm } from './SignUpForm';

export const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return <div></div>;
};

//return <SignUpForm />
