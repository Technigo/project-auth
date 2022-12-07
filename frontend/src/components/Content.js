import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './GlobalStyles';
import { API_URL } from './config';
import Loader from './Loader';

const Content = ({ url }) => {
  // 1. make content component, send in accessToken, get request to /thoughts (or make new one)
  
  const [mostViews, setMostViews] = useState('');
  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );

  console.log('mostViews:', mostViews);

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
        setMostViews(data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken]);

  if (loading) {
    return <Loader />;
  }

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
        {/* {mostViews.map((tedTalk) => {
          return (
            <li key={tedTalk._id}>
              <Link to={`/speaker/${tedTalk.speaker}`}>
                {tedTalk.speaker} - {tedTalk.title}
              </Link>
            </li>
          );
        })} */}
      </ol>
      {/* <p>{mostViews.response}</p> */}
      <button
        type="button"
        onClick={() => {
          window.location = `${url}/login`;
          localStorage.removeItem('accessToken');
        }}
      >
        Logout
      </button>
    </Wrapper>
  );
};

export default Content;
