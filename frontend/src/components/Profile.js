import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux';
import { user } from '../reducers/user';

const URL = 'http://localhost:8080/users';


export const Profile = ({ loggedInUser, URL }) => {

  const [userId, setUserId] = useState(0);
  // const [accessToken, setAccessToken] = useState("");
  const accessToken = useSelector((store) => store.user.login.accessToken); //kolla upp

  const [userInfo, setUserInfo] = useState({});



  useEffect(() => {
    console.log(loggedInUser);

    setUserId(loggedInUser._id);
    // setAccessToken(loggedInUser.accessToken);

    fetch(`${URL}/${userId}`, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => res.json())
      .then((json) => setUserInfo(json))
      .catch((err) => console.log("error:", err));
  }, [accessToken]);



  return (
    <div>
      Logged in with token:<br />
      {loggedInUser.accessToken}<br />
      {accessToken}<br />

      Profile page:<br />
      {userInfo.name}<br />
      {userInfo.userId}<br />
    </div>
  )
}
