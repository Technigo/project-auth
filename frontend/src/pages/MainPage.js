import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'
import travelInspo from '../reducers/travelInspo'


const Container = styled.div`
  background: #84a98c;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SubContainer = styled.div`
  background: #cad2c5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
  border: 1px solid #cad2c5;
  border-radius: 5px;
  padding: 20px;
`

const Heading = styled.h1`
  color: #072d32;
  font-size: 46px;
`

const Image = styled.img`

`

const SignOutButton = styled.button`
  border: solid 1px #072d32;
  background-color: #84a98c;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 20px;
  outline: none;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin: 10px 5px 0px 5px;

  &:hover, &:focus {
    background: rgb(53, 79, 82, 0.5);
    border: solid 1px rgb(53, 79, 82);
  }
`

const MainPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const accessToken = useSelector(store => store.user.accessToken)
  const inspo = useSelector(store => store.travelInspo.inspo) 

  useEffect(() => {
    // redirect user to '/' path
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

    fetch(API_URL('travelinspo'), options)   //make sure that this url is in line with the endpoint we have for the secret page
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(travelInspo.actions.setTravelInspo(data.secretMessage))
      })
  }, [accessToken, dispatch])

  
  const handleLogOut = () => {
    dispatch(user.actions.setSignOut())
    window.location.reload()
  }

  return (
    <Container>
      <SubContainer>
        <Heading>YOU'RE HERE!</Heading>
        <p>{inspo}</p>

        <Image
          src="https://plchldr.co/i/500x500?&bg=fcba03&fc=000000&text=TRAVEL"
        />

        <SignOutButton onClick={handleLogOut}>SIGN OUT</SignOutButton> 
      </SubContainer>
    </Container>
  )
}

export default MainPage