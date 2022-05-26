import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    };

    fetch(API_URL('profile'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setSecretMessage(data.secretMessage));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setError(data.response));
          // dispatch(user.actions.setItems([]));
        }
      });
  }, [accessToken, dispatch]);

  return (
    <div>
      <h1>{secretMessage}</h1>
      <button onClick={logout}>Log out</button>
      {/* {thoughtItems.map((item) => {
        return <div key={item._id}>{item.message}</div>;
      })} */}
    </div>
  );
};

export default Profile;
