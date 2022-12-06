import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  /* padding: 50px; */
`;

export const DetailWrapper = styled(Wrapper)`
  justify-content: unset;
`;
