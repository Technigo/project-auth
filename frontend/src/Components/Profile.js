import React, { useState, useEffect } from 'react'
import { Login } from 'Components/Login'

const URL = 'https://auth-login-project.herokuapp.com/users'

export const Profile = (loggedInUser) => {
  // loggedInUser = loggedInUser.loggedInUser
  const [userId, setUserId] = useState(0)
  const [accessToken, setAccessToken] = useState('')
  console.log(loggedInUser)

  const [logout, setLogout] = useState(false)


  useEffect(() => {
    fetch(`${URL}/${userId}`, {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log('error:', err))
  })

  return (
    <>
      <h1>Welcoooome to your profile</h1>
      <button onClick={() => setLogout(true)}>Log out</button>
    </>
  )
}
