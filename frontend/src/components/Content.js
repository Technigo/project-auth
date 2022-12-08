import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from './GlobalStyles';
import { API_URL } from './config';
import Loader from './Loader';

const Content = () => {
  // Local state variables for storing data from API
  const [mostViews, setMostViews] = useState('');
  const [loading, setLoading] = useState(true);
  const [accessToken] = useState(localStorage.getItem('accessToken'));

  const navigate = useNavigate();

  // Send in accessToken to /top10Views endpoint, set state variable with data from API
  useEffect(() => {
    if (accessToken) {
    }
    fetch(`${API_URL}/top10Views`, {
      method: 'get',
      headers: {
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMostViews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken]);

  if (loading) {
    return <Loader />;
  }

  // Protect the content behind the authorization from API
  if (!mostViews.success) {
    return (
      <Wrapper>
        <h1>This page requires login</h1>

        <Link to="/login">Login</Link>
        <h2>No account?</h2>
        <Link to="/register">Sign up today!</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>10 most viewd TED Talks</h1>
      <ol>
        {mostViews.body.map((tedTalk) => {
          return (
            <li key={tedTalk._id}>
              <Link to={`/speaker/${tedTalk.talk_id}`}>
                {tedTalk.speaker} - {tedTalk.title}
              </Link>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => {
          navigate('/login');
          localStorage.removeItem('accessToken');
        }}
      >
        Logout
      </button>
    </Wrapper>
  );
};

export default Content;
