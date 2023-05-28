import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import secrets from "reducers/secrets";
import { API_URL } from "utils/urls";
import user from "reducers/user";
const Main = () => {
    const secretItems = useSelector((store) => store.secrets.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    useEffect(() => {
        const options = {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("secrets"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(secrets.actions.setError(null));
                    dispatch(secrets.actions.setItems(data.response));
                } else {
                    dispatch(secrets.actions.setError(response));
                    dispatch(secrets.actions.setItems([]));
                }
            });
    })

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(secrets.actions.setItems([]));
    }
    return(
        <>
            <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
            {username ? (<h2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h2>): ""}
            {secretItems.map(item => {
                return(<p key={item._id}>{item.message}</p>)
            })}
        </>
    );
}

export default Main;