import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../Reducers/user'
import styled from 'styled-components/macro'

import { Button } from './Button'

const StyledForm = styled.form`
border: 2px solid black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 250px;
height: 300px;
`

const Label = styled.label`
font-size: 16px;
margin: 10px;
`

const Input = styled.input`
margin: 10px 10px 10px 0;
`

export const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 20px;
`

export const Form = ({ input, heading, labelHeading, labelText }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const createUser = (event) => {
        event.preventDefault();
        const USER_URL = "http://localhost:8080/users";

        fetch(USER_URL, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw "Couldn't create user"; //display errormessage from backend here
            })
            .then(json => {
                dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
                dispatch(user.actions.setUserId({ userId: json.userId }))
                localStorage.setItem("accessToken",json.accessToken)
            });
    };

    return (
        <Wrapper>
            <h1>{heading}</h1>
            <StyledForm>
                <Label> {labelHeading}
                    <Input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type='text'
                    />
                </Label>
                <Label> {labelText}
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type='text' />
                </Label>
                <Button input={input} onClickFunction={createUser} />
            </StyledForm>
        </Wrapper>
    )
}