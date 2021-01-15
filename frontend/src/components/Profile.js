import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { user } from '../reducers/user'

const URL = 'https://project-auth-cla-ellen.herokuapp.com/secret'

export const Profile = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  
  const getSecret = () => {
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed. Please try to login again')
        }
        return res.json() 
      })
      .then((json) => {
        dispatch(
          user.actions.setStatusMessage({
            statusMessage: json.secretMessage 
          })
        )
      })
      .catch((error) => {
        dispatch(
          user.actions.setStatusMessage({
            statusMessage: error
          })
        )
      })
  }

  const logout = () => {
    dispatch(
      user.actions.setLogout()
    )
  }
  
  return (
    <ProfileSection>
      <h2>Welcome! here is your profile!</h2>
      <p>Status Message: {`${statusMessage}`}</p>
      <CustomButton type="submit" onClick={getSecret}>
        SECRET BUTTON
      </CustomButton>
      <CustomButton type="submit" onClick={logout}>
        Log out
      </CustomButton>
    </ProfileSection>
  )
}

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 0px 10px 30px 10px;
  border-radius: 10px;
  border: 2px solid black;
`
const CustomButton = styled.button`
  border-radius: 10px;
  background: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`