import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import user from '../reducers/user';
import { SECRET_URL } from '../utils/API';

const Main = () => {
    const [secret, setSecret] = useState({});
    const accessToken = useSelector(store => store.user.accessToken);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    //   // if there is no accessToken then redirect to login
    useEffect(() => {
      if (!accessToken) {
        navigate('/');
      }
    }, [accessToken, navigate]);
  
    useEffect(() => {
      fetch(SECRET_URL)
        .then(res => res.json())
        .then(data => {
            setSecret(data);
  
        //   dispatch(secret.actions.setItems(data));
        //   dispatch(secret.actions.setErrors(null));
        });
    }, [dispatch, accessToken]);
  
    const handleLogout = () => {
      dispatch(user.actions.logout());
    };
    return (
        <div>
          <h1>Sup{' '}</h1>
          <button onClick={handleLogout}>SIGN OUT</button>
        </div>
      );
    };
    export default Main;