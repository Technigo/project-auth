import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { FormContainer, FormSection, FormHeader, FormInput, FormWrapper, Buttons, BackButton } from './Styles/Form.Styles';

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken)

    const goBack = () => {
        navigate(-1);
      }
    

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

        fetch(API_URL(mode), options) // registration URL
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setUserId(data.userId))
                        dispatch(user.actions.setAccessToken(data.accessToken))
                        dispatch(user.actions.setUserName(data.username))
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

            <FormHeader>
                <h1>Glad you want to join!</h1>
                <h3>Already a member? Sign in <Link to="/">here</Link></h3>
            </FormHeader>
        
            <FormContainer>
                <FormWrapper onSubmit={onFormSubmit}>
                        <label htmlFor="username">Username</label>
                        <FormInput
                            type="text"
                            id="username"
                            placeholder="My username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <FormInput
                            type="password"
                            id="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        {loginError !== null && (
                            <p>{loginError}</p>
                        )}

                    <Buttons type="submit">Sign Up</Buttons>
            </FormWrapper>
            </FormContainer>
        </FormSection>


    )
}