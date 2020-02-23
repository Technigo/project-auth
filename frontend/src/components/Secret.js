import React, { useState, useEffect } from 'react'
import '../index.css'

const URL = 'http://localhost:3000/secrets'

export const Secret = ({ accessToken }) => {
  const [secret, setSecret] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
        console.log(object.secret)
        if (object.secret) {
          setSecret(object.secret)
        } else {
          setErrorMessage('no pic for you')
        }
      })
      .catch((e) => {
        //console.log(e)
      })
  }, [])

  return (
    <div>
      <iframe
        src={secret}
        width='480'
        height='480'
        frameBorder='0'
        className='giphy-embed'
        allowFullScreen></iframe>
    </div>
  )
}
