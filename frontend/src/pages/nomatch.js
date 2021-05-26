import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();

  return (
    <div>
      <h1>This page does not exist</h1>
      <button type="button" onClick={() => history.push('/')}>
        Go back
      </button>
    </div>
  );
};
