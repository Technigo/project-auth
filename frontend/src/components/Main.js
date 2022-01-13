import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cats from '../reducers/cats';
import user from '../reducers/user';

import styled from 'styled-components';

// import { LOGIN_URL } from '../utils/urls';
import { URL_CATS } from '../utils/urls';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: red solid 2px;
  border-radius: 8px;
  max-width: 70%;
  width: 60%;
  margin: 60px auto 0 auto;
  font-family: 'Dongle', sans-serif;
  padding: 20px;

  img {
    width: 100%;
    object-fit: contain;
  }
  button {
    width: 150px;
    border-radius: 8px;
    border: 2px solid grey;
    height: 37px;
    margin-top: 40px;
    box-shadow: 2px 2px #000;
    text-transform: uppercase;
    background: red;
    color: lavenderblush;
    font-weight: 700;
  }

  button:hover {
    align-items: center;
    cursor: pointer;
    box-shadow: none;
    background: lavenderblush;
    color: red;
    border: 2px solid red;
  }
  h1 {
    font-size: 2rem;
    padding: 20px;
    font-size: 44px;
  }
`;

const Main = () => {
  const [cat, setCat] = useState({});
  // const catItems = useSelector((store) => store.cats.items);
  const accessToken = useSelector(store => store.user.accessToken);
  // const logOut = useSelector((store) => store.user.logout);

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
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(user.actions.logout());
  };

  return (
    <Wrapper>
      <h1>Meet your new meowster</h1>
      <img src={cat.file} />
      <button onClick={handleLogout}>SIGN OUT</button>
    </Wrapper>
  );
};
export default Main;
