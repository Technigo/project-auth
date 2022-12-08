import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { user } from 'reducers/user'

import styled from 'styled-components/macro'
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Headline } from '../GlobalStyles';
import { Batman } from '../GlobalStyles';
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from 'utils/utils'



export const Main = () => {
    const userId = useSelector((store) => store.user.userID)
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();


    useEffect(()=>{
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("user"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(user.actions.setUserId(data.response))
                    dispatch(user.actions.setError(null))
                } else {
                    dispatch(user.actions.setUserId([]))
                    dispatch(user.actions.setError(data.response))
                }
            })
    }, [])
  return (
    <OuterWrapper>
    <InnerWrapper>
        <Batman />
        <Headline><span>The Batcave</span></Headline>
        <Text>Sign up now to get exclusive access!</Text>
        <ButtonLink to="/signup">
            <Buttons type="button">Sign up</Buttons>
        </ButtonLink>
        <Text>Already a member? Log in to your account.</Text>
        <ButtonLink to="/login">
            <Buttons type="button">Log in</Buttons>
        </ButtonLink>
    </InnerWrapper>
    </OuterWrapper>
  );
}


const ButtonLink = styled(Link)`
 width: 100%;
`;

const Text = styled.p`
 color: white;
`;

