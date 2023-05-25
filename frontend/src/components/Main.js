import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";

export const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    const [quote, setQuote] = useState("")
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("secret"), options)
            .then(res => res.json())
            .then(data => setQuote(data.body[0]))
    }, [])
    return (
        <img src={`${quote.image_link}`} alt={`${quote.quote}`} />
    ) 
};