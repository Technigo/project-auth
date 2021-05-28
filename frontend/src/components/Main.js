import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken);

    const history = useHistory();

    useEffect(() => {
        if (!accessToken) {
            history.push('/login');
        }
    }, [accessToken, history]);

    return (
        <div>
            <h1>
            Secret Page
            </h1>
        </div>
    );
};

export default Main;