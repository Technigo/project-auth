import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  return (
    <>
      {statusMessage && (
        <StatusWrapper>
          <p>{`${statusMessage}`}</p>
        </StatusWrapper>
      )}
      {errorMessage && (
        <StatusWrapper>
          <p>{`${errorMessage}`}</p>
        </StatusWrapper>
      )}
    </>
  );
};

const StatusWrapper = styled.div`
  background: #fff;
  color: #00544F;
  font-weight: bold;
  font-size: 12px;
  padding: 6px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
`;