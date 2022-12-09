import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { Link, useNavigate } from "react-router-dom";
import user from 'reducers/user';

const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();

    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null));
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response));
                }
            })
    }, []);
    

    return (
        <>
        <div className="logged-in-box"> 
            <h2>You logged in</h2>
            <h4>Sorry to say nothing happens here</h4>
            <h4>please log out</h4>   
            <button 
                type="button"
                onClick={() => { navigate("/login"); dispatch(user.actions.setAccessToken(null));}}>
                    SIGN OUT
                </button>
                </div>         
        </>
    )
}

export default Main;