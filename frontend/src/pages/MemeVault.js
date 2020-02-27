import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Images } from '../components/Images' 
import { Button } from '../components/Button'

const Wrapper = styled.section`

`

const Text = styled.h3`
font-size: 20px;
color: #F5F3F5;
`

const ErrorMsg = styled.p`
  padding-top: 25px;
  font-weight: 700;
  font-style: italic;
  color: red;
`

export const MemeVault = ({ username }) => {
  const history = useHistory()
  const [error, setError] = useState()
  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetch('http://localhost:8080/memevault', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${accessToken}`
      },
      signal: abortController.signal
    }).then(response => {
      if (response.status !== 200) {
        setError(`${response.status}: Error: Not logged in`)
        return
      }
    })
  })

  return (
    <Wrapper>
{username && <Text>Hey, you made it {username}!</Text>}
{!error && accessToken && (
  <Button onClick={handleLogout} title="Log out" />
)}
{!error ? (
  <Images />
) : (
    <ErrorMsg>{error}</ErrorMsg>
  )}
</Wrapper>
  )
}


