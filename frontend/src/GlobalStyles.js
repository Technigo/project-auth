import styled from 'styled-components/macro'

export const Buttons = styled.button`
  position: relative;
  border: none;
  background: #6580b0;
  cursor: pointer;
  color: #fff;
  width: 100%;
  height: 30px;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  text-align: center;
`;

export const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #9fafd3;
`;

export const Batman = styled.div`
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 50%;
  filter: invert(100%);
  background-image: url(images/batman.png);
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Headline = styled.h1`
    color: white; 
    width: 100%; 
    text-align: center; 
    border-bottom: 2px solid white; 
    line-height: 0.1em;
    margin: 40px 0 20px;

 span{
    background: #9fafd3;
    padding:0 10px;
    font-weight: normal;
 }
`;

export const TextInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  padding: 3px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

export const Label = styled.label`
  color: white;
`;