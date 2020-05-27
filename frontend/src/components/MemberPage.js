import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { Button } from './Button'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding: 50px;
  color:  #254b62;
`
const Header = styled.h1`
  color:  #254b62;
  text-shadow: 2px 2px #cff532;
  font-size: 40px;
  margin-top: 40px;
`

const Text = styled.p`
 font-size: 26px;
 width: 100%;
`

export const MemberPage = () => {
  const url = 'https://anna-project-auth.herokuapp.com/secrets'
  const history = useHistory()
  const [error, setError] = useState()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  const backToLogin = () => {
    history.push('/')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('You are not logged in.')
        }
        res.json()
      })
      .catch(err => {
        setError(err.message)
      })
  })

  // Conditional rendering of memberpage depending on if there is an accesstoken or not
  if (localStorage.getItem('accessToken')) {
    return (
      <Section>
        <Header> Welcome down the rabbit hole</Header>
        <Text>
          Alice was beginning to get very tired of sitting by her sister on the bank,
          and of having nothing to do: once or twice she had peeped into the book her
          sister was reading, but it had no pictures or conversations in it, 'and what
          is the use of a book,' thought Alice 'without pictures or conversation?'
          So she was considering in her own mind (as well as she could, for the hot day
          made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain
          would be worth the trouble of getting up and picking the daisies, when suddenly a
          White Rabbit with pink eyes ran close by her...
      </Text>
        < Button onClick={handleLogout} title='Sign out' />
      </Section>
    )
  } else {
    return (
      <Section>
        <h2>{error} </h2>
        <Button title='Back to Login' onClick={backToLogin} />
      </Section>

    )
  }
}

