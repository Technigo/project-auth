import styled from 'styled-components/macro'

export const Card = styled.div`
  width: 100%;
  margin: 0 0 33px 0;
  padding: 16px;
  background: snow;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 500px) {
    padding: 32px;
  }
`