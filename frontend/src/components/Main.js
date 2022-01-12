import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cats from '../reducers/cats';
import user from '../reducers/user';

import { LOGIN_URL } from '../utils/urls';
import { URL_CATS } from '../utils/urls';

const Main = () => {
  const [cat, setCat] = useState({});
  const catItems = useSelector(store => store.cats.items);
  const accessToken = useSelector(store => store.user.accessToken);
  const logOut = useSelector(store => store.user.logout);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   // if there is no accessToken then redirect to login
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    fetch(URL_CATS)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCat(data);

        dispatch(cats.actions.setItems(data));
        dispatch(cats.actions.setErrors(null));
      });
  }, [accessToken, URL_CATS]);

  const handleLogout = () => {
    dispatch(user.actions.logout());
  };

  return (
    <div>
      <img src={cat.file} />
      <button onClick={handleLogout}>SIGN OUT</button>
    </div>
  );
};
export default Main;
