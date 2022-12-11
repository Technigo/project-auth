import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL, HAPPY_API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"
import { Fromapp } from "../happythoughts/FromApp";

// const THOUGHTS_URL = "https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/";
// export const HAPPY_API_URL = (slug) => `${THOUGHTS_URL}/${slug}`;


const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username); // show username when logged in
    const navigate = useNavigate();
  

//log out - back to loginpage    
const home = () => {
    navigate ("/");
}
    
    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(HAPPY_API_URL("thoughts"), options)
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
        <Userpage>
            <Link to="/login"> GO TO LOGIN</Link>
            <Welcometext>
            Welcome {username} 
            </Welcometext>
            <div>
                <Logoutbutton onClick={() => home()}>Log out</Logoutbutton>
            </div>
            <Fromapp/>
        </Userpage>
    )
}

export default Main;

const Userpage = styled.div `
    color: white;
    text-align: center;
`

const Logoutbutton = styled.button `
    color: white;
    margin-top: 10%
`

const Welcometext = styled.h2 `
    color: white;
    margin-top: 5%;
    text-align: center;
`