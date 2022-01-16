import React, { useState, useEffect } from 'react'

import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { user } from '../../Reducers/user'
import { API_URL } from 'utils/url';

import './signin.css'

export const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            body: JSON.stringify({ email, password })
        }

        fetch(API_URL('signin'), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        <section className="form" >
            <h2>Sign in</h2>

            <form className="form-item" onSubmit={onFormSubmit} >
                <div className="text-type">
                    <label htmlFor="email">
                        Email
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>

                    <label htmlFor="passsword" >
                        Password
                        <input
                            type="password"
                            name="passsword"
                            id="passsword"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="error">{error}</p>}

                </div>
                <div className="submit-type">
                    <button type="submit" className="form-button" >SUBMIT</button>
                </div>
            </form>
        </section>
    )
}
