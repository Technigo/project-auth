import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import secret from '../assets/secret.jpg';
import user from '../reducers/user';

const Main = () => {
  const secretsItems = useSelector((store) => store.secrets.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function for logout
  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem('user');
    });
  };

  // If not having accessToken, redirect to login
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // mapping over secret reducer
  return (
    <div className="secret-page">
      <h1>It's a secret!</h1>
      <img src={secret} alt="super secret" />

      {secretsItems.map((secret) => (
        <div key={secret.id}>{secret.text}</div>
      ))}

      <button className="button-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
