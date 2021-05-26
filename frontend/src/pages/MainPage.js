import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../reusable/urls'

import travelInspo from '../reducers/travelInspo'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`

`

const MainPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

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
      .then(data => dispatch(travelInspo.actions.setTravelInspo(data)))
  }, [accessToken, dispatch])

  return (
    <Main>
      MAIN PAGE

      <Image
        src="https://plchldr.co/i/500x500?&bg=fcba03&fc=000000&text=TRAVEL"
      />

      <Link to="/signin">GO TO SIGN IN</Link> 
    </Main>
  )
}

//instead of having a Link above, have a button that says SIGN OUT and dispatch actions to do so

export default MainPage