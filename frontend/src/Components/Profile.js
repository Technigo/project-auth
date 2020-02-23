import React, { useState, useEffect } from 'react'

export const Profile = () => {
  const [userId, setUserId] = useState(0)
  const [accessToken, setAccessToken] = useState('')

  const [logout, setLogout] = useState(false)
  const URL = 'http://localhost:8080/users'

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
