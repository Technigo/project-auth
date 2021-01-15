import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const errorMessage = useSelector((store) => store.user.errorMessage);

  return (
    <>
    <p>Hej</p>
      {statusMessage && (
        <div>
          <p>{`${statusMessage}`}</p>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{`${errorMessage}`}</p>
        </div>
      )}
    </>
  );
};