import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { API_URL } from '../reusable/urls';

import listitems from '../reducers/listitems';

const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken);
    const listitemsItems = useSelector(store => store.listitems.items);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!accessToken) {
            history.push('/login');
        }
    }, [accessToken, history]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: accessToken
            }
        }

        fetch(API_URL('listitems'), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    batch(() => {
                        dispatch(listitems.actions.setListitems(data.listitems));
                        dispatch(listitems.actions.setErrors(null));
                    });
                } else {
                    dispatch(listitems.actions.setErrors(data));
                }
            });
    }, [accessToken]);

    console.log(listitemsItems)
    return (
        <div>
            <div>MAIN</div>
            <Link to="/login">Go here to log in!</Link>
            <div>Your shopping list</div>
            {listitemsItems.map(list => (
                <div key={list._id}>{list.message}</div>
            ))}
        </div>
    );
};

export default Main;