import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thoughts } from 'reducers/thoughts';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import { StickyNotes } from './StickyNotes';

export const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
        };

        fetch(API_URL('thoughts'), options)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems(data.response));
                } else {
                    dispatch(thoughts.actions.setError(data.error));
                    dispatch(thoughts.actions.setItems([]));
                }
            });
    }, [accessToken, dispatch]);

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
    };

    const postNewThought = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            body: JSON.stringify({ message }),
        };

        fetch(API_URL('thoughts'), options)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems([...thoughtItems, data.response]));
                    setMessage('');
                } else {
                    dispatch(thoughts.actions.setError(data.error));
                }
            });
    };

    return (
        <>
            <button type="button" onClick={onLogoutButtonClick}>
                LOGOUT
            </button>
            {username ? <h2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h2> : ''}
            <div className='sticky-notes-container'>
                <form className='messageForm' onSubmit={postNewThought}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                    />
                    <button type="submit">Post Message</button>
                </form>
                <StickyNotes thoughts={thoughtItems} />
            </div>
        </>
    );
};
