import React from 'react';
import { useSelector } from 'react-redux';

import { StatusMessage } from 'styling/styling';


export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const errorMessage = useSelector((store) => store.user.errorMessage);

  return (
    <StatusMessage>
      {statusMessage && (
        <div>
          <p>{`${statusMessage}`}</p>
          <span role="img" aria-label="confetti">🎉</span>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{`${errorMessage}`}</p>
          <span role="img" aria-label="warning">⚠️</span>
        </div>
      )}
    </StatusMessage>
  );
};