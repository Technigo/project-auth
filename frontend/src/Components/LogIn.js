import React from "react";
import { useDispatch } from 'react-redux'
import { logout } from '../Reducers/user'

import { Button } from './Button'
import { Wrapper, H2, H3 } from '../styles/Styles'

export const LogIn = ({ username }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <H2>You are logged in!</H2>
      <H3>{username}</H3>
      <Button input="Sign out" onClickfunction={(e) => dispatch(logout())}/>
    </Wrapper>
  );
};
