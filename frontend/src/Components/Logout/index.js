import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { user } from '../../Reducers/user';
import { manga } from 'Reducers/manga';
import './logout.css';


export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(manga.actions.setclearManga());
        dispatch(user.actions.setclearUser());
        navigate('/');

    }

    return (
        <div className="logoutMainContainer">
            <button className="logout" onClick={handleLogout}><Link to="/" className="signout">Sign out</Link></button>
        </div>
    )
}