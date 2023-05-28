import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thoughts } from 'reducers/thoughts';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import { StickyNotes } from './StickyNotes';
import './Main.css';

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
            <button className="logOutBtn" type="button" onClick={onLogoutButtonClick}>
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                <div className='logOutText'>LOG OUT</div>
            </button>
            {username ? <h1>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h1> : ''}
            <div className='sticky-notes-container'>
                <form className='messageForm' onSubmit={postNewThought}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                    />
                    <button className="postBtn" type="submit">Post Message</button>
                </form>
                <StickyNotes thoughts={thoughtItems} />
            </div>
        </>
    );
};
