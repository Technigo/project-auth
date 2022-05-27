import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import user from "reducers/user"
import styled from 'styled-components/macro'

const SignOut = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeToken = () => {
        dispatch(user.actions.setAccessToken(null))
        navigate("/login")
    }

    return (
        <StyledButton onClick={() => removeToken()} background="#BAC0D4" boxShadow="2px 3px #3a4664;" width="100px">Sign out </StyledButton>
    )

}

export default SignOut


const StyledButton = styled.button`
    margin-top: 1rem;
    height: 25px;
    font-size: 0.9rem;
    width: ${props => props.width};
    font-family: inherit;
    background: ${props => props.background};
    border: none;
    box-shadow: ${props => props.boxShadow};
    
    &:hover {
        text-decoration: ${props => props.textDecoration};
    }
`