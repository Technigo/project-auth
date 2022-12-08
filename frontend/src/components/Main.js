import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/urls';

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const accessToken = useSelector((store) => store.user.accessToken);
    // maybe mode here too
    const dispatch = useDispatch();
    const navigate =useNavigate();

    useEffect( () => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        } // we need to put someting in the database to acctually be displayed
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) { //kollar datan och om success är true (från backend)
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response))
                }
            })
    }, [])

    // Log out function here

    return (
        <>
            <Link to="/login">GO TO LOGIN</Link> {/* I think Daniel wrote this, but i feel unsure about the link to log in here */}
            <h2>This is the Main</h2>
            {thoughtItems.map((item) => {
                return ( 
                    <p key={item._id}>{item.message}</p>
                )
            })}
        </>
    )
}

export default Main