import styled from 'styled-components/macro';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonLogout = styled.button`
  font-size: 1rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  padding: 10px 20px;
  border: 4px solid #777;
  border-radius: 45px;
  cursor: pointer;
  transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
  position: fixed;
  right: 20px;
  top: 20px;

  &:hover {
    background-color: #777;
    color: white;
  }
`;

export const Greetings = styled.h2`
  font-size: 1.5rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  text-align: center;
`;

export const ThoughtsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const Thought = styled.p`
  font-size: 1.4rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  text-align: center;
`;
