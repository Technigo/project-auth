import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import '../index.css'

const URL = 'http://localhost:8000/secrets'

export const Secret = ({ accessToken }) => {
  const [secret, setSecret] = useState()
  const history = useHistory()

  useEffect(() => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((object) => {
        setSecret(object.secret)
      })
  }, [])

  return (
    <main>
      {secret ? (
        <>
          <h1>Here is the secret picture!</h1>
          <img className='revealedSecret' src={secret} />
          <button onClick={() => history.push("/")}>Sign Out</button>
        </>
      ) : (
        <>
        <p>Sign in to see the secret picture! It will be awesome!</p>
        <button onClick={() => history.push("/sessions")}>Sign In</button>
        </>
      )}
    </main>
  )
}
