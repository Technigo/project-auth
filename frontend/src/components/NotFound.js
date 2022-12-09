import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <>
          <h1>Not found...</h1>
            <Link to="/">
              <SubmitButton>Go back</SubmitButton>
            </Link>
        </>
    )
}

export default NotFound;

const SubmitButton = styled.input`
    color: black;`