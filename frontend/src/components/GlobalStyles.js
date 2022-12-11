import styled from 'styled-components/macro';

// GLOBAL WRAPPERS
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
  max-width: 420px;
  background: rgba( 255, 255, 255, 0.12 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  border-radius: 5%;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

//OTHER WRAPPERS
export const Label = styled.div`
padding: 40px;
`


//INPUT  (see index.css for hiding radio buttons)
export const Form = styled.form`
display: grid;
place-items: center;
padding-top: 10%;
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
export const ModeLabel = styled.label`
color: white;
font-size: 1.1rem;
@media (min-width:320px){
&:hover{
color:  #E7447B;
}
}
`

export const Button = styled.button`
    -webkit-appearance: none;
    margin: 10px;
    width: 310px;
    height: 40px;
    border-radius: 30px;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: 20px;
    font-weight: 500;
@media (min-width:720px){
    &:hover{
        background: rgb(184,0,230);
        background: linear-gradient(90deg, #E58CB5 0%, #E7447B  70%,  #E7447B 100%);
        color: #fff;
    }
}
` //radial-gradient(96% 96% at 23% 14%, #E6D9F2 0%, #E7447B 100%)