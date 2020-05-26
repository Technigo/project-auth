import React, { useState } from "react"
import styled from "styled-components/macro"
import { user } from "../reducers/user"
import { useDispatch, useSelector } from 'react-redux'


const URL = "https://signinprojecttechnigo.herokuapp.com/users"

const ProfileWrapper = styled.div`

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
  const accessToken = useSelector((store) => store.user.login.accessToken);
  // const userInfo = useSelector((store) => store.user.login.userInfo);


  const logout = () => {
    dispatch(user.actions.logout());
  };

  return (
    <ProfileWrapper>
      <h1>Inloggad</h1>
      {/* <h2>{`${userInfo}`}</h2> */}
      <Button type="submit" onClick={logout} value="Logga ut">Logga ut</Button>
    </ProfileWrapper>
  )
}