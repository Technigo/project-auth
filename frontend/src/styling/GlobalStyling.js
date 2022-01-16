import styled from 'styled-components'

export const ContentWrapper = styled.div`
    width: 340px;
    margin: 0 auto;

    @media (min-width: 768px) {
        min-width: 600px;
    }

    @media (min-width: 992px) {
        min-width: 800px;
        font-size: larger;
    }
`

export const Button = styled.button`
    border: none;
    background: #DB398D;
    border-radius: 2em;
    padding: 12px 20px;
    color: #fff;
    font-size: 1.2rem;
    margin: 1.2em auto;
    :hover,
    :focus {
        color: #DB398D;
        background: rgb(243, 237, 237);
        outline: 0;
        font-weight: bold;
    }
`