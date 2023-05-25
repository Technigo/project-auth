import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
// import memes from "reducers/memes";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/urls";
import { Button, Container } from "@mui/material";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    // const memeItems = useSelector((store) => store.memes.memeItems)
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    // fetch thoughts
    useEffect(() => {
        const options = {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems(data.response));
                } else {
                    dispatch(thoughts.actions.setError(response));
                    dispatch(thoughts.actions.setItems([]));
                }
            });
    }, [])

    // // Fetch memes
    // useEffect(() => {
    //     const options = {
    //         method:"GET",
    //         headers: {
    //             // "Content-Type": "application/json",
    //             "Authorization": accessToken
    //         }
    //     }
    //     fetch('https://api.imgflip.com/get_memes', options)
    //         .then(res => res.json())
    //         .then(memeData => {
    //             if(memeData.success) {
    //                 console.log(memeData)
    //                 dispatch(memes.actions.setMemeItems(memeData.memes));
    //                 dispatch(memes.actions.setError(null));
    //             } else {
    //                 dispatch(memes.actions.setMemeItems([]));
    //                 dispatch(memes.actions.setError(response));
    //             }
    //         });
    // }, [])

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
        dispatch(memes.actions.setMemeItems([]));
    }
    return(
        <Container component="main" maxWidth="sm" sx={{marginTop: 8}}>  
            {/* <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button> */}
            {username ? (<h2>Welcome to this very VIP page {username}!</h2>): ""}
            {thoughtItems.map(item => {
                return(<p key={item._id}>{item.message}</p>)
            })}
            {/* {memeItems.map(item => {
                return(<p key={item.id}>{item.name}</p>)
            })} */}
            <Button 
                type="button" 
                variant="contained"
                onClick={onLogoutButtonClick}>
                Log out
            </Button>
        </Container>
    );
}

export default Main;