import React from 'react';
import { Link } from 'react-router-dom';

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