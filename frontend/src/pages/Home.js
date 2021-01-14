import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Wrapper } from 'lib'

const Home = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);

  return (
    <Wrapper>
      {accessToken &&
      <h1>This is your Home Page and you are logged in</h1>
      
      }
      {!accessToken && (
        <div>
          <h2>Public Home Page</h2>
          <Link to="/signup">
            <button>Wanna signup?</button>
          </Link>
          <Link to="/login">
            <button>Wanna login?</button>
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
