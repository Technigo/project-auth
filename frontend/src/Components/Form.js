import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../Reducers/user'
import { StyledForm, Label, Input, H1, Wrapper} from 'styles/Styles'

import { Button } from './Button'

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
            <H1>{heading}</H1>
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
                        type='password' />
                </Label>
                <Button input={input} onClickFunction={createUser} />
            </StyledForm>
        </Wrapper>
    )
}