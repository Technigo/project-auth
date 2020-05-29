import React, { useState, useEffect } from 'react'
import { NasaDaily } from 'components/NasaDaily'
import { LogOut } from 'components/LogOut'
import { Container } from 'components/Container'
import { H1 } from 'components/TextStyles'

const URL_SECRET = 'https://week20-auth-app.herokuapp.com/secret'
// const URL_SECRET = 'http://localhost:8080/secret'

export const Secret = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(URL_SECRET, {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => res.json())
      .then(json => setMessage(json.name))
  }, [])
 
  return (
    <Container>
      <H1>Very welcome seeker {message}!</H1>
      <LogOut />
      <NasaDaily />
    </Container>
  )
}
