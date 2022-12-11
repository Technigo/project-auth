import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  gap: 1.5rem;

  background: whitesmoke;
  border: 2px solid orangered;
  border-radius: .5rem;
  margin: 3rem auto 0;
  width: 23rem;
  min-height: 23rem;
  padding-bottom: 1rem;

  & p {
    color: gray;
    font-size: .9rem;
    font-weight: 700;
    width: 17rem;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: hotpink;
  width: 15rem;

    & input {
      margin-left: .5rem;
    }
    `;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  color: gray;
  
  & fieldset {
    border: 1px solid orangered;
    border-radius: 5px;
  }
  
  & label {
    color: orangered;
    font-size: .8rem;
    font-weight: 700;
  }
  
  & input {
    background: whitesmoke;
    border: none;
    width: 15rem;
    height: 2rem;
  }
  
  input:focus{
    outline: none;
    color: hotpink;
    font-family: 'Comfortaa', cursive, sans-serif;
  }
  
  input::placeholder {
   color: gray;
   font-family: 'Comfortaa', cursive, sans-serif;
  }
  
  & div {
    display: flex;
    justify-content: flex-end;
    margin-right: .15rem;
  }
  `;
