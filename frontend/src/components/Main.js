import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../reusable/urls';

import thoughts from '../reducers/thoughts';

const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken);
    // const thoughtsItems = useSelector(store => store.thoughts.items);

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

        fetch(API_URL('thoughts'), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    batch(() => {
                        dispatch(thoughts.actions.setThoughts(data.thoughts));
                        dispatch(thoughts.actions.setErrors(null));
                    });
                } else {
                    dispatch(thoughts.actions.setErrors(data));
                }
            });
    }, [accessToken]);
    
    // console.log(thoughtsItems)
    
    return (
        <div>
            <div>MAIN</div>
            {/* {thoughtsItems.map(thought => (
                <div key={thought._id}>{thought.message}</div>
            ))} */}
        </div>
    );
};

export default Main;