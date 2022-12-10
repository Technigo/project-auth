import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  border: none;
  border-radius: 5px;
  color: gray;
  cursor: pointer;
  font-family: 'Comfortaa';
  font-size: 1rem;
  font-weight: 700;
  width: 6rem;
  height: 2.5rem;
  padding: .5rem;
  transition: all .3s ease;
  transform: rotate(-6deg);

    :active {
      font-size: .95rem;
      transform: scale(.99);
      width: 5.47rem;
    }

    :hover {
      border: 2px solid mediumpurple;
      color: mediumpurple;
    }

    & a {
      text-decoration: none;
      color: mediumpurple;
    }

     a:active {
      color: mediumpurple;
     }
`;




