import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { user } from "../reducers/user";

const DetailsButton = ( { SIGNUP_URL } ) => {
  const { id } = useParams()
  const [ validate, checkValidate ] = useState(false)
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  // const dispatch = useDispatch();
  

  const loginSuccess = (loginResponse) => {
    checkValidate(prev => !prev)
    console.log(loginResponse, "success")
    // dispatch(
    //   user.actions.setStatusMessage({
    //     statusMessage: loginResponse.secretMessage,
    //   })
    // );
  };

  const loginFailed = (loginError) => {
    console.log(loginError)
    // dispatch(user.actions.setAccessToken({ accessToken: null }));
    // dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const handleClick = () => {
    fetch(`${SIGNUP_URL}/${userId}`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Failed to retrieve secret';
      }
      return res.json();
    })
    // SUCCESS: Do something with the information we got back
    .then((json) => loginSuccess(json))
    .catch((err) => loginFailed(err)); //401
  }

  return (
    <div> { accessToken &&
       //<Link to={`/users/${userId}`}>
        <button type="submit" onClick={handleClick}>User Details</button>
       //</Link>
      } <div>{validate && `ID:${userId}, Token:${accessToken}`}</div>
    </div>
  )
}

export default DetailsButton;