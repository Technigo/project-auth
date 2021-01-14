import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { user } from '../reducers/user'

export const LoginStatus = () => {
  const dispatch = useDispatch()

  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const secret = useSelector((store) => store.user.login.secret)

  const [secretStatus, setSecretStatus] = useState()

  const fetchSecret = () => {
    fetch('http://localhost:8080/secret', {
      method: 'GET',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw `Getting secret failed: ${res.status}`
        }
        return res.json()
      })
      .then((json) => {
        dispatch(user.actions.setSecret({ secret: json.secret }))
      })
      .catch((err) => {
        setSecretStatus(`Secret Status: ${err}`)
      })
  }

  return (
    <>
      <p>{statusMessage && statusMessage}</p>
      <button onClick={fetchSecret}>Fetch secret</button>
      <p>{secretStatus && secretStatus}</p>
      <p>{secret && `Here's the secret: ${secret}`}</p>
    </>
  )
}