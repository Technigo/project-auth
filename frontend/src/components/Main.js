import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import styled from "styled-components";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
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
    })

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
    }
    return(
        <>
        <Container>
            <Wrapper>
            <StyledButton type="button" onClick={onLogoutButtonClick}>SIGN OUT</StyledButton>
            {username ? (<H2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</H2>): ""}
            {thoughtItems.map(item => {
                return(<P key={item._id}>{item.message}</P>)
            })}
            </Wrapper>
        </Container>
        </>
    );
}

export default Main;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
color: black;
width: 40%;
padding: 50px;
background: #F2BA52;
border-radius: 15px;
border: 1px solid black;

&:hover {
    box-shadow: 5px 5px 0 0 black;
  }

@media screen and (max-width: 400px) {
    width: 60%;
}
`

const StyledButton = styled.button`
cursor: pointer; 
color: white;
text-decoration: none;
border-radius: 15px;
padding: 8px;
gap: 1rem;
background-color: #F2BA52;
color: black;
border: 1px solid black;
font-family: 'Finlandica', sans-serif;
font-size: 1.1rem;

&:hover {
    background-color: white;
  }
`
const H2 = styled.h2`
color: white;
`
const P = styled.p`
color: white;
font-size: 1.3rem;
`