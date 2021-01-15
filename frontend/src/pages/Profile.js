import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout, getSecretMessage } from '../reducers/user';
import { Wrapper } from 'lib';

const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  return (
    <Wrapper>
      {accessToken && (
        <div>
          <h1>Welcome to your Profile page</h1>
          <h2>Discover what secret message is waiting for you</h2>
          {errorMessage && <h4>{`${errorMessage}`}</h4>}
          {secretMessage && <h4>Secret Message : {`${secretMessage}`}</h4>}
          <input
            type="submit"
            onClick={(e) => dispatch(getSecretMessage())}
            value="View Secret Message"
          />
          <input
            type="submit"
            onClick={(e) => dispatch(logout())}
            value="Logout"
          />
        </div>
      )}
      {!accessToken && <Redirect to="/" />}
    </Wrapper>
  );
};
export default Profile;
