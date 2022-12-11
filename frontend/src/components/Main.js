import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { useNavigate } from "react-router-dom";
import user from 'reducers/user';
import { Button, Card } from "./GlobalStyles";

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
        <LogOutCard>
        <Box> 
            <h2>You logged in</h2>
            <h4>Sorry to say nothing happens here</h4>
            <h4>please sign out</h4>   
            <Btn 
                type="button"
                onClick={() => { navigate("/login"); dispatch(user.actions.setAccessToken(null));}}>
                    SIGN OUT
                </Btn>
        </Box>    
        </LogOutCard>     
        </>
    )
}

export default Main;
const LogOutCard = styled(Card)`
width: 360px;
height: 300px;
`

const Btn = styled(Button)`
width: 126px;
color: #1F36FB;
`
const Box = styled.div`
width: 390px;
text-align: center;
padding-top: 5%;
`