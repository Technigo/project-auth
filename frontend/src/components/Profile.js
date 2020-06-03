import React, { useState } from "react"
import styled from "styled-components/macro"
import { logout, getSecretMessage } from "../reducers/user"
import { useDispatch, useSelector } from 'react-redux'


const ProfileWrapper = styled.div`
  background-color: #FDE7EA;
  padding: 20px;
  margin-bottom: 20px;
  width: 45%;
`

const Button = styled.button`
  background-color: #FF7C98;
  color: #FFFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-transform: uppercase; 
  outline: none;
  border: none;
  margin: 20px;
`

export const Profile = ({ accsessToken }) => {
  const dispatch = useDispatch();
  dispatch(getSecretMessage())
  const secretMessage = useSelector((store) => store.user.login.secretMessage);


  return (
    <ProfileWrapper>
      <h1>Inloggad</h1>
      {secretMessage && <h4>Secret Message : {`${secretMessage}`}</h4>}
      {console.log({ secretMessage })}
      <Button type="submit" onClick={(e) => dispatch(logout())} value="Logga ut">Logga ut</Button>
    </ProfileWrapper>
  )
}