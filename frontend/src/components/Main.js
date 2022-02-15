import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Logout } from './Logout';

const Main = () => {
  const username = useSelector((store) => store.user.username);
  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <div>
        <Link to='/login'>To '/login' !</Link>
      </div>
      <h1>Welcome {username}</h1>
      <img
        class='welcome-image'
        src='https://media.giphy.com/media/GyrVlOlmCWHQzBFGPC/giphy.gif'
        alt='welcome'
      ></img>
      <Logout />
    </div>
  );
};

export default Main;
