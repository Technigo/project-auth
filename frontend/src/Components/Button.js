import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
font-size: 18px;
margin: 10px;
`

export const Button = ({ input }) => {
    return (
        <Btn type='submit'>
            {input}
        </Btn>
    )
}