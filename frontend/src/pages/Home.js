import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Wrapper } from 'lib'

const Home = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);

  return (
    <Wrapper>
      <h1>Home Page</h1>
      {!accessToken && (
        <div>
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

// const Wrapper = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: column;
// `