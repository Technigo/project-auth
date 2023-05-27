import React, { useEffect, useState } from 'react';
import styled  from "styled-components";
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/utils';

const OuterWrapper = styled.div `
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  text-align: center;
  
`

const Secrets = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [secretMessage, setSecretMessage] = useState(null);

  useEffect(() => {
    const options = {
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(`${API_URL}/secrets`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.secret) {
          setSecretMessage(data.secret);
        } else {
          setSecretMessage('Failed to fetch secret message');
        }
      })
      .catch((error) => {
        console.log('Secrets fetch error', error);
        setSecretMessage('Failed to fetch secret message');
      });
  }, [accessToken]);

  return (
    <OuterWrapper>
    <div>
      <h1>This is a Secret Page</h1>
      {/* <p>{secretMessage}</p> */}
      <p>This is the secret page! Woop woop</p>
    </div>
    </OuterWrapper>
  );
};

export default Secrets;
