import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { API_URL } from 'utils/utils';

import user from 'reducers/user';

const Profile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const secretMessage = useSelector((store) => store.user.secretMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      };

      fetch(API_URL('secret'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setSecretMessage(data.secretMessage));
              dispatch(user.actions.setError(null));
            });
          } else {
            dispatch(user.actions.setError(data.response));
          }
        });
    }
  }, [accessToken, dispatch]);

  return (
    <div className="container">
      <h1 className="header">{secretMessage}</h1>
      <iframe
        src="https://giphy.com/embed/d2Z9QYzA2aidiWn6"
        title="Awsome"
        className="giphy"
        allowFullScreen
      />
      <button className="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
