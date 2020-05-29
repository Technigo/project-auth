
import styled from 'styled-components/macro'
import image from '../assets/secret.jpg'



export const SecretMessageContainer = styled.div`
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    justify-content: center;
    background-color: #CBD4EA;
    border: solid 2px black;
  }
`

export const Image = styled.div`
    width: 500px;
    height: 400px;
    background-image: url(${image});
    background-size: cover; 
    background-position: center center; 
    margin: 10px;
    @media (min-width: 768px) {
        width: 200px;
        height: 375px;
  }
`