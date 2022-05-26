import React from 'react'
import { Link } from 'react-router-dom'
import { Container, SubmitButton, StyledForm, MainData } from "./Style"

import Header from './Header'
import Footer from './Footer'

const NotFound = () => {
    return (
    <Container>
        <Header />
        <StyledForm>
            <MainData>Not found.. 😔</MainData>
            <Link to="/">
                <SubmitButton>Go back</SubmitButton>
            </Link>
        </StyledForm>
        <Footer />
    </Container>
    )
}

export default NotFound