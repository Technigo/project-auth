import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  return (
    <>
      {statusMessage && (
        <StatusWrapper>
          <p>{`Response: ${statusMessage}`}</p>
        </StatusWrapper>
      )}
    </>
  );
};

const StatusWrapper = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding: 6px;
  width: 200px;
  text-align: center;
`;