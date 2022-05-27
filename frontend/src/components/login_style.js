import styled from 'styled-components';

export const BackGround = styled.div`
  background: linear-gradient(to top left, #28B487, #7DD56F);
  height: 100vh;
  width: 100%;
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 6rem;
`;

export const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 10px;
`;

export const TextArea = styled.input`
  height: 35px;
  width: 280px;
  border-radius: 10px;
  padding-left: 10px;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`

export const Label = styled.label`
  padding-left: 10px;
`
export const RadioButtons = styled.input`
width: 1.15em;
height: 1.15em;
border-radius: 50%
`

export const ErrorMessage = styled.p`
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px #FFF;
  max-width: 270px;
  margin-bottom: 30px;
`
export const SubmitButton = styled.button`
  margin: auto;
  font-size: 16px;
  padding: 10px 15px;
  color: #000;
  border: 2px solid #FFF;
  border-radius: 0.12em;
  background-color: #d3d3d3;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35)
  transition: all 0.15s;
  &:hover {
    text-shadow: 0 0 2em rgba(255, 255, 255, 1)
    color: #FFF;
    border-color: #FFCE54;
  }


`;

export const ButtonWrapper = styled.div`
  text-align: center;
`;
