import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  border: none;
  border-radius: 5px;
  color: hotpink;
  cursor: pointer;
  font-family: 'Comfortaa';
  font-size: 1rem;
  width: 6rem;
  height: 2.5rem;
  padding: .5rem;
  transition: all .2s ease;

    :active {
      font-size: .95rem;
      transform: scale(.99);
      width: 5.7rem;
    }

    :hover {
      border: 1px solid orangered;
    }

    & a {
      text-decoration: none;
      color: orangered;
    }

     a:active {
      color: orangered;
     }
`;




