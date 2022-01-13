import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from './Cat';

import styled from 'styled-components';

const Start = () => {
  return (
    <div>
      <div>
        <h1>Welcome to secret cat society</h1>
        <Lottie />
      </div>

      <Link to='/signup'>Enter</Link>
    </div>
  );
};
export default Start;
