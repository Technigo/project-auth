import React, { useState, useEffect } from 'react'

import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { user } from '../../Reducers/user'
import { API_URL } from 'utils/url';

import './signup.css'

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const accessToken = useSelector((store) => store.user.accessToken);
    const error = useSelector((store) => store.user.error);


    useEffect(() => {
        if (accessToken) {
            navigate('/manga');
        }

    }, [accessToken, navigate]);


    const onFormSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }

        fetch(API_URL('signup'), options)
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setUserId(data.response.id));
                        dispatch(user.actions.setUserName(data.response.name));
                        dispatch(user.actions.setUserEmail(data.response.email));
                        dispatch(user.actions.setUserAccessToken(data.response.accessToken));
                        dispatch(user.actions.setError(null));
                    });

                } else {
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setUserName(null));
                    dispatch(user.actions.setUserEmail(null));
                    dispatch(user.actions.setUserAccessToken(null));
                    dispatch(user.actions.setError(data.response));
                }
            })
    }

    return (
        <section className="form">
            <h2>Sign up</h2>

            <form className="form-item" onSubmit={onFormSubmit}>

                <div className="text-type">
                    <label htmlFor="name">
                        Name
                        <input
                            id="name"
                            type="text"
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                        />
                    </label>

                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="email"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>

                    <label htmlFor="passsword">
                        Password (Min length 5 characters)
                        <input
                            id="passsword"
                            type="password"
                            value={password}
                            minlength="5"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                {error && error.keyValue.name && <p className="error">Name {error.keyValue.name} already exists</p>}
                {error && error.keyValue.email && <p className="error">Email {error.keyValue.email} already exists</p>}

                <div className="submit-type">
                    <button type="submit" className="form-button">SUBMIT</button>
                </div>
            </form>
        </section>
    )
}
