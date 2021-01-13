import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);

  return (
    <>
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
    </>
  );
};

export default Home;
