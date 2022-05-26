import styled from "styled-components/macro"

export const devices = { 
    mobile: "(min-width: 375px)",
    tablet: "(min-width: 768px)",
    desktop: "(min-width: 1025px)"
}

// export const HeaderContainer = styled.div`
//     height: 250px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     background-color: #FFF;
// `

// export const HeaderTitle = styled.h1`
//     color: #EC9B3B;
//     text-transform: uppercase;
//     font-size: 60px;
//     letter-spacing: 2px;
// `

export const RegisterLabel = styled.label`
    color: #EC9B3B;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
`

export const LoginLabel = styled.label`
    color: #EC9B3B;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
`

export const StyledForm = styled.form`
    background-color: #0E3EDA;
    margin: 16px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
`

export const UsernameLabel = styled.label`
    color: #FFF;
    font-size: 18px;
    padding: 10px;
    margin-top: 50px;
`

export const UsernameInput = styled.input`
    background: #FFF;
    border: 2px solid #FFF;
    border-radius: 4px;
    height: 30px;
    width: 250px;
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
    width: 250px;
`

export const SubmitButton = styled.button`
    margin-top: 40px;
    background-color: #F190B7;
    color: #FFF;
    width: 150px;
    text-transform: uppercase;
    border-radius: 30px;
    padding: 10px;
    border: 3px solid #F190B7;
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
        background-color: #FFF;
        color: #F190B7;
        border: 3px solid #FFF;
    }
`

// export const LoginHeadline = styled.h2`
//     color: #FFF;
//     text-align: center;
//     font-size: 24px;
// `

// export const FooterText = styled.p`
//     font-size: 14px;
//     text-align: center;
// `