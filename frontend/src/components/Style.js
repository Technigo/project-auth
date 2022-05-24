import styled from "styled-components/macro"

export const devices = { 
    mobile: "(min-width: 375px)",
    tablet: "(min-width: 768px)",
    desktop: "(min-width: 1025px)"
}

export const HeaderContainer = styled.div`
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
`

export const HeaderTitle = styled.h1`
    color: #EC9B3B;
    text-transform: uppercase;
    font-size: 60px;
    letter-spacing: 2px;
`

export const SignupButton = styled.button`
    background-color: #FEEFF4;
    color: #FF0000;
    width: 150px;
    text-transform: uppercase;
    border-radius: 30px;
    padding: 10px;
    border: 3px solid #FEEFF4;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
        background-color: #FF0000;
        color: #FFF;
    }
`

export const StyledForm = styled.form`
    background-color: #0E3EDA;
    margin: 8px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
`

export const LoginHeadline = styled.h2`
    color: #FFF;
    text-align: center;
    font-size: 24px;
`

export const UsernameLabel = styled.label`
    color: #FFF;
    font-size: 18px;
    padding: 10px;
`

export const UsernameInput = styled.input`
    background: #FFF;
    border: 2px solid #FFF;
    border-radius: 4px;
    height: 30px;
    width: 200px;
`

export const PasswordLabel = styled.label`
    color: #FFF;
    font-size: 18px;
    padding: 10px;
`

export const PasswordInput = styled.input`
    background: #FFF;
    border: 2px solid #FFF;
    border-radius: 4px;
    height: 30px;
    width: 200px;
`

export const LoginButton = styled.button`
    margin-top: 60px;
    background-color: #0E3EDA;
    color: #FFF;
    width: 175px;
    text-transform: uppercase;
    border-radius: 30px;
    padding: 10px;
    border: 3px solid #FFF;
    font-size: 18px;
    letter-spacing: 1px;
    &:hover {
        background-color: #FFF;
        color: #0E3EDA;
        cursor: pointer;
    }
`

export const FooterText = styled.p`
    font-size: 14px;
    text-align: center;
`