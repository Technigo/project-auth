import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { users } from '../reducers/users';

export const LogOut = () => {
  const dispatch = useDispatch();
  const handleButton = () => {
    dispatch(users.actions.logOut());
  };
  return <Button onClick={handleButton}>Log out</Button>;
};

const Button = styled.button`
  font-family: 'Inconsolata';
  padding: 4px 15px;
  background: none;
  border: 1px solid #000;
  width: 150px;
  margin: 30px;
  cursor: pointer;
`;
