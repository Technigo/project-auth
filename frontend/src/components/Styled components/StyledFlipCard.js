import styled, { css } from 'styled-components';

export const StyledFlipCard = styled.div`
  background-color: transparent;
  width: 300px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
`;

export const StyledCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  ${props => props.isFlipped && css`
    transform: rotateY(180deg);
  `}

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);

    &:first-child {
      background-color: rgb(245, 220, 200);
    }

    &:last-child {
      background: rgb(202,224,236);
      background: radial-gradient(circle, rgba(202,224,236,1) 0%, rgba(40,34,221,0.8183648459383753) 100%);
      transform: rotateY(180deg);
      font-size: 32px;
    }
  }

  & > div:last-child {
    margin-top: 20px;
  }
`;