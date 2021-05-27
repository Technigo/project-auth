import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../reusable/urls'

import user from '../reducers/user'
import travelInspo from '../reducers/travelInspo'

const Image = styled.img`

`

const SignOutButton = styled.button`
  
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
    <>
      MAIN PAGE
      <p>{inspo}</p>

      <Image
        src="https://plchldr.co/i/500x500?&bg=fcba03&fc=000000&text=TRAVEL"
      />

      <SignOutButton onClick={handleLogOut}>SIGN OUT</SignOutButton> 
    </>
  )
}

export default MainPage