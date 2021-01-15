import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const ErrorMessage = ({ errorMessage }) => {
  const error = useSelector((store) => store.users.user.errorMessage);
  console.log({ error: error });
  console.log({ errorMessage });
  console.log('Hello from error message');
  return <p>{errorMessage}</p>;
};
