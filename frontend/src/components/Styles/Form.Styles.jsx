import styled from 'styled-components'

export const FormSection = styled.section`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 300px;
`

export const FormContainer = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border-radius: 10px;
    border: none;
`

export const FormHeader = styled.div`
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    a {
        text-decoration: underline;
        color: black;
        font-weight: 600;
    }

    h1 {
        font-family: 'League Spartan', sans-serif;
        font-size: 2.5rem;
        margin: 0;
        padding: 10px;
        letter-spacing: -0.1rem;
    }

    h3 {
        font-family: 'League Spartan', sans-serif;
        font-size: 1.1rem;
        font-weight: 400;
    }

`

export const FormWrapper= styled.form`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    justify-content: center;
    align-items: center;

    & label {
        display: flex;
        align-self: baseline;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #7a7979eb;
    }
`

export const FormInput = styled.input`
   font-size: 1rem;
   border-radius: 10px;
   padding: 10px;
   margin-bottom: 10px;
   border: none;
   background: #d4cecead;

   &::placeholder {
    font-weight: light;
    font-family: 'Poppins', sans-serif;
    opacity: .5;
    color: #5f5f5feb;
}
`

export const Buttons = styled.button`
   font-family: 'Poppins', sans-serif;
   font-size: 0.8rem;
   font-weight: bold;
   border-radius: 8px;
   padding: 10px;
   width: 100%;
   margin-top: 15px;
   background: #FFC090;
   border: none;
`