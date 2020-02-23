import React, { useState, useEffect } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const URL = 'http://localhost:3000/secrets'

export const Secret = ({ accessToken }) => {
  const [secret, setSecret] = useState()

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
    <div>
      {secret ? (
        <>
          <h1>Here is the secret picture!</h1>
          <iframe
            src={secret}
            width='480'
            height='480'
            frameBorder='0'
            className='giphy-embed'
            allowFullScreen></iframe>
        </>
      ) : (
        <>
          <Link to='/sessions'>Sign in</Link> to see the secret picture
        </>
      )}
    </div>
  )
}
