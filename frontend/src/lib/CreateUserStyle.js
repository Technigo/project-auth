import styled from 'styled-components';

export const CreateUserContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 5px grey;

  @media (min-width: 667px) {
    height: auto;
  }

  @media (min-width: 1024px) {
    width: 35%;
    border-radius: 0 20px 20px 0;
    max-width: 500px;
    height: 600px;
  }
`;

export const Register = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 300px;
`;

export const Title = styled.h1`
  align-self: flex-start;
  color: purple;
  font-size: 36px;
  padding: 20px 0;
`;