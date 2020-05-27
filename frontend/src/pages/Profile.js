import React from 'react';
import { user } from '../reducers/user';
import { logout, getSecretMessage } from '../reducers/user'
import styled from 'styled-components';
import { Headline } from '../lib/headline';
import { TestButton } from '../lib/button';
import { Register } from '../lib/form'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'

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



export const Profile = () => {
  const dispatch = useDispatch();
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const userName = useSelector((store) => store.user.login.userName);


  return (
    <ProfileInfo>
      <Headline title="profile" />
      <InfoDiv>
        {errorMessage && <h4>Error message : {`${errorMessage}`}</h4>}
        {secretMessage && <h4>Secret message : {`${secretMessage}`}</h4>}
        <Register>Welcome {userName}!</Register>
        <input type="submit" onClick={() => dispatch(getSecretMessage())} value="Test Secret Endpoint" />
        <Link to="/login"><input type="submit" onClick={() => dispatch(logout())} value="Log Out" /></Link>
      </InfoDiv>
    </ProfileInfo>
  );
};
export default Profile;