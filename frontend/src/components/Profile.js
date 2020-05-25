import React, { useState } from "react"
import styled from "styled-components"
import { user } from "../reducers/user"
import { useDispatch, useSelector } from 'react-redux'


const URL = "https://signinprojecttechnigo.herokuapp.com/users"
const ProfileWrapper = styled.div`

`
///fixa till denna sida 

export const Profile = () => {
  return (
    <ProfileWrapper>
      <h2>Hej  </h2>

    </ProfileWrapper>
  )
}