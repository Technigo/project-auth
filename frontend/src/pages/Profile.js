import React from 'react';
import { user, logout, getSecretMessage } from '../reducers/user';
import styled from 'styled-components';
import { Headline } from '../lib/headline';
import { Button } from '../lib/button';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = styled.div`
  width: 60%;
  margin: 1em auto;
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px;
`

const InfoDiv = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
  width: 20em;
`

const URL = 'http://localhost:8080/users';
export const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  return (
    <ProfileInfo>
      <Headline title="profile" />
      <InfoDiv>
        <h2>Status :</h2>
        {errorMessage && <h4>Error message : {`${errorMessage}`}</h4>}
        {secretMessage && <h4>Secret message : {`${secretMessage}`}</h4>}
        <h4>userId :</h4>
        <p> {`${userId}`}</p>
        <h4>accessToken :</h4>
        <p> {`${accessToken}`}</p>
        <Button type="submit" onClick={(e) => dispatch(getSecretMessage())} title="Test Secret Endpoint" />
        <Button type="submit" onClick={(e) => dispatch(logout())} title="Test Logout" />
      </InfoDiv>
    </ProfileInfo>
  );
};
export default Profile;