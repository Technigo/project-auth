import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import Button from '../components/Button'

const SecretPage = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  const onButtonClick = () => {
    batch(()=> {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
  }

  return (
    <Main>
      <Title>
        Welcome in!
      </Title>
      <lottie-player
        src='https://assets4.lottiefiles.com/private_files/lf30_Xtzj7X.json' 
        background='transparent'
        speed='1'
        style={{width: '300x', height: '300px'}}
        loop 
        autoplay>
      </lottie-player>
      <Button
        onClick={onButtonClick}
        text='LOG OUT'
      />
    </Main>
  )
}

export default SecretPage

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 48px;
`