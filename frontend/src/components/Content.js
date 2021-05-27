import React, { useState, useEffect } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import user from '../reducers/user'

import { StyledButton } from './StyledBtn'
import { API_URL } from '../reusables/urls'  


const Image = styled.img`
  width: 700px;
  height: auto;
`

export const Content = () => {
const [ imgsrc, setImgsrc ] = useState(null)
const dispatch = useDispatch()
const history = useHistory()

const accessToken = useSelector(store => store.user.accessToken)

useEffect(() => {
  if (!accessToken) {
    history.push('/')
  }
},[accessToken, history])

useEffect(() => {

  const options = {
    method: 'GET',
    headers: {
      Authorization: accessToken
    }
  }
  fetch(API_URL('session'), options)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setImgsrc(data.images[0].url)
      } else {
        dispatch(user.actions.setErrors(data))
      }
    })
  },[accessToken, dispatch])

  const onLogOut = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setErrors(null))
    })
    history.push('/')
  }

  return (
    <>
    {imgsrc ? <Image src={imgsrc} alt="cat" /> : <p>Loading image...</p>}
    <StyledButton onClick={onLogOut}>Log out</StyledButton>
    </>
  )
}