import styled from "styled-components"

export const ButtonContainer = styled.div`
    border-top: 1px solid lightgrey;
    width: 90%;
    margin-top: 15px;
    text-align: center;
`

export const Button = styled.button`
    border-radius: 20px;
    font-size: 20px;
    font-weight: 200;
    width: 100%;
    padding: 10px;
    border: 1px solid lightgrey;
    background-color: rgba(189,227,219,0.8);
    &:hover {
        background-color: rgb(189,227,219);
    }
    cursor: pointer;
`