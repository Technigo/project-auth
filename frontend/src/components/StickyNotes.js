// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useRef } from 'react';
import './StickyNotes.sass';

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// STICKY NOTES /////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const StickyNotes = ({ thoughts }) => {
    const createButtonRef = useRef(null);
    const handleCreateClick = () => {
        const textarea = document.createElement('textarea');
        createButtonRef.current.parentNode.insertBefore(textarea, createButtonRef.current);
    };
    const postNewThought = (e) => {
        e.preventDefault();
        const message = "Your message here"; // Replace with your desired message value
        const accessToken = "YourAccessToken"; // Replace with your access token
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

// //////////////////////////////////////////////////////////////////////// //
// ///////////////////////////// RETURN JSX /////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

    return (
        <div className='stickyNotes'>
            {thoughts.map((thought) => (
                <div key={thought._id} className="sticky-note">
                    <textarea value={thought.message} readOnly></textarea>
                </div>
            ))}
        </div>
    );
};