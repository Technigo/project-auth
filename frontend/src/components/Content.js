import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './GlobalStyles';
import { API_URL } from './config';
import Loader from './Loader';

const Content = ({ url }) => {
  // 1. make content component, send in accessToken, get request to /thoughts (or make new one)

  const [allTheContent, setAllTheContent] = useState('');
  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );

  console.log('allTheContent:', allTheContent);

  useEffect(() => {
    if (accessToken) {
    }
    fetch(`${API_URL}/thoughts`, {
      method: 'get',
      headers: {
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((content) => {
        setAllTheContent(content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken]);

  if (loading) {
    return <Loader />;
  }

  if (!allTheContent.success) {
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
      <h1>Content</h1>
      <p>{allTheContent.response}</p>
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
