import React, { useState, useEffect } from 'react'
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

const Text = styled.p`
 font-size: 26px;
 width: 100%;
`


export const MemberPage = () => {
  const [userInfo, setUserInfo] = useState()
  const url = 'https://anna-project-auth.herokuapp.com/secrets'

  useEffect(() => {
    fetch(url)
    //Här ska det vara .then och grejer
  })
  return (
    <Section>
      <Text> Hej här ska det stå massa saker om användare.
      Hej här ska det stå massa saker om användare.
      Hej här ska det stå massa saker om användare.
      </Text>
      < Button title='Sign out' />
    </Section>
  )
}

