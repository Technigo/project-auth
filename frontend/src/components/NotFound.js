import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, OuterWrapper, InnerWrapper, MessageWrapper, Header, Paragraph, Label, TextArea } from "./GeneralStyles"

const NotFound = () => {
    const navigate = useNavigate()

    return(
        <OuterWrapper vh100>
            <InnerWrapper> 
                <Header>Sorry, nothing here...</Header>
                <Header>😕</Header>
                <Button onClick={() => navigate("/")}>
                    Go to Login
                </Button>
            </InnerWrapper>
        </OuterWrapper>
        
    );
}

export default NotFound;