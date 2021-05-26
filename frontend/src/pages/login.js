import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { login } from '../store/session'

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = "mytokentoken"
  
  const onLogin = () => {
    dispatch(login(token));
    history.push("/");
  }

  return (
    <div>
      <button type="button" onClick={onLogin}>Login</button>
    </div>
  )
}