import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { user } from "../reducers/user";

const DetailsButton = ( { SIGNUP_URL } ) => {
  const { id } = useParams()
  const [ validate, checkValidate ] = useState(false)
  const [ result, setResult] = useState({})
  const accessToken = useSelector((store) => store.user.login.accessToken )
  const userId = useSelector((store) => store.user.login.userId)
 
  const loginSuccess = (loginResponse) => {
    checkValidate(prev => !prev)
    setResult(loginResponse)    // dispatch(
  };

  const loginFailed = (loginError) => {
    console.log(loginError)
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
      } <div>{validate && `Email:${result.email},ID:${result.userId}, accessToken:${result.accessToken}`}</div>
    </div>
  )
}

export default DetailsButton;