import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { FormContainer, FormSection, FormHeader, FormInput, FormWrapper, Buttons } from './Styles/Form.Styles';

import user from '../reducers/user'

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken)

    useEffect(() => {
        if (accessToken) {
            navigate("/secretContent")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        };

        fetch("https://project-authentication-yz4wzwvsha-uc.a.run.app/login", options) // login URL
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setUserId(data.response.userId))
                        dispatch(user.actions.setAccessToken(data.response.accessToken))
                        dispatch(user.actions.setUserName(data.response.username))
                        dispatch(user.actions.setError(null))
                        setLoginError(null)
                    })

                } else {
                    batch(() => {
                        dispatch(user.actions.setError(data.response))
                        dispatch(user.actions.setUserId(null))
                        dispatch(user.actions.setAccessToken(null))
                        dispatch(user.actions.setUserName(null))
                        setLoginError(data.response)
                    })
                }
            })
    }
    

    return ( 
        <FormSection>

            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>

            <FormHeader>
                <h1>Welcome Love</h1>
                <h3>Not a member yet? Sign up <Link to="/signUp">here</Link></h3>
            </FormHeader>
        
            <FormContainer>
                <FormWrapper onSubmit={onFormSubmit}>
                        <label htmlFor="username">Username</label>
                        <FormInput
                            type="text"
                            id="username"
                            placeholder="My username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <FormInput
                            type="password"
                            id="password"
                            placeholder="******"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        {loginError !== null && (
                            <p>{loginError}</p>
                        )}

                        <Buttons type="submit">Sign in</Buttons>
                </FormWrapper>
            </FormContainer>
        </FormSection>

    )
}