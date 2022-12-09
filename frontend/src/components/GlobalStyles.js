import styled from 'styled-components/macro';

export const OuterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 480px;
  width: 420px;
  background: rgba( 255, 255, 255, 0.12 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  border-radius: 5%;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;


//INPUT
export const Form = styled.div`
display: grid;
place-items: center;
`
export const Input = styled.input`
margin: 10px;
width: 300px;
height: 40px;
border-radius: 30px;
border: white 2px solid;
background: none;
font-size: 20px;
line-height: 20px;
text-align: center;
color: white;
::placeholder{
    color: white;
}
&:focus {
    outline: none;
}
`

export const Button = styled.button`
    margin: 10px;
    width: 300px;
    height: 40px;
    border-radius: 30px;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: 20px;
    &:hover{
        background: rgb(184,0,230);
        background: linear-gradient(90deg, rgba(184,0,230,1) 0%, rgba(115,0,144,1) 80%, rgba(95,0,119,1) 100%);
        color: #fff;
    }
`