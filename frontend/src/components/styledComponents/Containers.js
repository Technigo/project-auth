import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f96e61;
  min-height: 100vh;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 50rem;
  min-width: 400px;
  min-height: 400px;
  background-color: #fc9e5bad;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  label {
    display: flex;
    flex-direction: column;
  }

  button {
    border-radius: 2rem;
    border: none;
    padding: 1rem;
  }
`;
