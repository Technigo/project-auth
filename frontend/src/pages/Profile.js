import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout, getSecretMessage } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  return (
    <>
      {accessToken && (
        <div>
          <h1>Profile</h1>
          <h2>Status :</h2>
          {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
          {secretMessage && <h4>Secret Message : {`${secretMessage}`}</h4>}
          <h4>userId :</h4>
          <p> {`${userId}`}</p>
          <h4>accessToken :</h4>
          <p> {`${accessToken}`}</p>
          <input
            type="submit"
            onClick={(e) => dispatch(getSecretMessage())}
            value="Test Secret Endpoint"
          />
          <input
            type="submit"
            onClick={(e) => dispatch(logout())}
            value="Test Logout"
          />
        </div>
      )}
      {!accessToken && <Redirect to="/" />}
    </>
  );
};
export default Profile;
