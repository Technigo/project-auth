import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <>
        <p><Link to="/login">Go to Login</Link></p>
        <p><Link to="/">Go to Main</Link></p>
        <p>Request Not Found</p>
        </>
    )
};