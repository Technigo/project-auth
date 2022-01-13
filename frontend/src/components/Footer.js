import React from 'react'
import styled from 'styled-components'

export const Footer = () => {

    return (

        <FooterWrapper>
            <H3>Daniel & Jessi, Foxes, January 2022</H3>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 4rem;
`

const H3 = styled.h3`
font-size: 1rem;
line-height: 1.5rem;
font-weight: 400;
color: #F3EFCC;
`