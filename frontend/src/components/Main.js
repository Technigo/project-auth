import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import { user } from "reducers/user";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    const secretMessage = useSelector((store) => store.user.secretMessage);

    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    useEffect( () => {
        if (accessToken){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "accessToken"
            }
        };

        fetch(API_URL('secret'), options)
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                    dispatch(user.actions.setSecretMessage(data.response.secretMessage));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setError(data.response));
                }
    });
}
},[accessToken, dispatch])

    return(
        <>
        <Link to="/login">Go to Login</Link>
        <h2>This is the main page</h2>
        <h2>{secretMessage}</h2>
        </>
    )
}

export default Main;