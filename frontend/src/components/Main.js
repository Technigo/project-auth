import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import user from "reducers/user";

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    useEffect( ()=>{
        if(!accessToken) {
            navigate("/login");
        } 

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("loggedin"), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setContent(data.response);
                } else {
                    console.log(data)
                }
            })
    }, [accessToken]);


    return (
        <div className="container">
            <h1>You are logged in</h1>
            <p>User name: {username}</p>
            <p>{content}</p>
            <button 
                type="button"
                onClick={() => {
                    navigate("/login");
                    dispatch(user.actions.setAccessToken(null));
                }}
                >
                    Log out
                </button>
        </div>

    )
};

export default Main;
