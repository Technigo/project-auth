import styled from "styled-components/macro"

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const Header = styled.h1`
    font-weight: 300;
    font-size: 35px;
    margin-top: 15px;
    @media (min-width: 768px) {
        font-size: 40px;
    }
`

export const Form = styled.form`
    width: 80%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 20px;
    align-items: center;
    margin: 60px auto;
    padding: 10px;
    background-color: rgba(244,244,244,0.5); 
    @media (min-width: 768px) {
        max-width: 650px;
        margin: 150px auto;
    }
`
export const InputWrapper = styled.div`
    text-align: left;
    margin: 0 auto;
`

export const Label = styled.label`
    font-weight: 300;
    margin-bottom: 10px;
`

export const InputField = styled.input`
    border-radius: 10px;
    width: 100%;
    margin: 15px 0;
    box-sizing:border-box;
    border: 1px solid lightgrey;
    background-color: whitesmoke;
    padding: 15px;
`

export const SecondaryButtonContainer = styled.div`
    border-top: 1px solid lightgrey;
    width: 90%;
    margin-top: 15px;
    text-align: center;
`

export const Text = styled.p`
    font-weight: 300;
    margin-top: 15px;
`

export const PrimaryButton = styled.button`
    border-radius: 10px;
    font-size: 20px;
    font-weight: 200;
    width: 50%;
    margin: 10px 0 10px 0;
    padding: 10px 20px;
    border: 1px solid lightgrey;
    background-color: rgba(189,227,219,0.9);
    &:hover {
        background-color: rgb(189,227,219);
    }
    cursor: pointer;
`

export const SecondaryButton = styled.button`
    border-radius: 10px;
    font-size: 20px;
    font-weight: 200;
    width: 50%;
    margin-bottom: 30px;
    padding: 10px 20px;
    border: 1px solid lightgrey;
    background-color: rgba(189,227,219,0.8);
    &:hover {
        background-color: rgb(189,227,219);
    }
    cursor: pointer;

`

export const ErrorMessage = styled.div`
    border: 1px solid red;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 300;
    width: fit-content;
    padding: 10px;
    border: 2px solid rgb(123,104,238);
`