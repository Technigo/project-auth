import styled from 'styled-components/macro';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; // Increased margin to avoid overlap with Logout button
  width: 100%;
  max-width: 800px;

  @media (max-width: 490px) {
    max-width: 300px;
  }
`;

export const ButtonLogout = styled.button`
  font-size: 0.8rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  padding: 8px 16px;
  margin-bottom: 70px;
  border: 3px solid #777;
  border-radius: 45px;
  cursor: pointer;
  transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
  right: 44%;
  top: 20px;
  

  &:hover {
    background-color: #777;
    color: white;
  }
`;

export const Greetings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  margin-top: 60px;
`;

export const ThoughtsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
`;

export const Thought = styled.p`
  font-size: 1rem;
  color: #777;
  font-family: 'Sora', helvetica, sans-serif;
  font-weight: 800;
  text-align: center;
`;
