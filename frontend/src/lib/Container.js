import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #F9E9FA;

@media (min-width: 667px) {
  flex-direction: row;
  height: 100vh;
}
`;