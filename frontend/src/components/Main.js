import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "reducers/user";
import { Button, Wrapper, TextContainer } from "./GlobalStyles";
import styled from "styled-components";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);

    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    // This page is shown if the user is authenticated. A message from the Forest Witch is then displayed.
    return(
        <>
        <Wrapper>
        <TextContainer>
        <h2>Hi, {username}</h2>
        <p>I hope you're doing well today. If you are not, it's okay too. I'm wishing for a good day for you and I just want to say that I believe in you.</p>
        <h5>From your giant friend,</h5>
        <h5>The Forest Witch</h5>
        </TextContainer>
        <Button
        type="button"
        onClick={() => {
          navigate("/login");
          dispatch(user.actions.setAccessToken(null));
        }}
      >
        Log Out
        </Button>
        </Wrapper>
        </>
    )
}

export default Main;