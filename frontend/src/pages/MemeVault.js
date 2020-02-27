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

export const MemeVault = ({ username }) => {
  const history = useHistory()
  const [error, setError] = useState()
  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  useEffect(() => {
    const authFail = new authFail()
    fetch('http://localhost:8080/memevault', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${accessToken}`
      },
      signal: authFail.signal
    }).then(response => {
      if (response.status !== 200) {
        setError(`${response.status}: Error: Not logged in`)
        return
      }
    })
  })

  return (
    <Wrapper>
      <Text>Hey! You made it. Scroll down to take part of my private programmer memestash</Text>
      <Images />
      <Button onClick={handleLogout} title="Log out" />
    </Wrapper>
  )
}
