import React from 'react';
import { useSelector } from 'react-redux';
import { user } from '../reducer/user';


export const UserPage = ({ id }) => {
    const users = useSelector((store) => store.user.login.find(item => item.userId === id));
    return (
        <section>
            <h1>`Hello there, ${user.userName}`</h1>
        </section>
    )
}