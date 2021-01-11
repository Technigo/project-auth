import React from 'react'

import { Wrapper } from './Form'

export const LogIn = ({ username }) => {
    return (
        <Wrapper>
            <h2>You are logged in!</h2>
            <h3>{username}</h3>
        </Wrapper>
    )
}