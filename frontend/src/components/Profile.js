import React, { useState } from "react"
import styled from "styled-components"
import { user } from "../reducers/user"
import { useDispatch, useSelector } from 'react-redux'


const URL = "https://signinprojecttechnigo.herokuapp.com/users"

const ProfileWrapper = styled.div`

`

export const Profile = ({ accsessToken }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const firstName = useSelector((store) => store.user.login.firstName);


  const logout = () => {
    dispatch(user.actions.logout());
  };

  return (
    <ProfileWrapper>
      <h1>Inloggad</h1>
      <h2>{`${firstName}`}</h2>
      <input type="submit" onClick={logout} value="Logga ut" />
    </ProfileWrapper>
  )
}