import styled from 'styled-components/macro'

export const SecretContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px;
    text-align: center;
    animation: flip-in-ver-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    @keyframes flip-in-ver-left {
        0% {
            transform: rotateY(80deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(0);
            opacity: 1;
        }
        }

    h1 {
        font-family: 'League Spartan', sans-serif;
        font-size: 2.5rem;
    }

    h3 {
        font-family: 'League Spartan', sans-serif;
        font-size: 1.2rem;
    }
    
`