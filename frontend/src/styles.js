import styled from "styled-components/macro";

//Global
export const Container = styled.div`
  background: #eee;
  height: 100vh;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
`;

export const Error = styled.div`
  color: red;
  margin: 0 auto;
  margin-top: 1rem;
`;

export const TransparentButton = styled.button`
  grid-column: 3 / span 1;
  grid-row: 4 / span 1;
  opacity: 1;
  background: transparent;
  color: white;
  border-radius: 30px;
  z-index: 100;
  boder: 2px white solid;
  text-decoration: none;
  cursor: pointer;
  font-family: "Open Sans";
  letter-spacing: 2px;
  :hover {
    background: white;
    color: black;
  }
`;

export const FullButton = styled.button`
  margin: 0 auto;
  text-align: center;
  margin-top: 3rem;
  width: 6rem;
  padding: 1rem;
  background: #a46c4d;
  color: white;
  border: none;
  border-radius: 30px;
  font-family: "Open Sans";
  letter-spacing: 1px;
  cursor: pointer;
  :hover {
    background: #cfac99;
  }
  @media (min-width: 600px) {
    width: 12rem;
  }
`;

export const Label = styled.label`
  margin: 0 auto;
  margin-top: 0.5rem;
  color: grey;
  @media (min-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;
export const Input = styled.input`
  margin: 0 auto;
  width: 70%;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 0.5rem;
  @media (min-width: 600px) {
    padding: 1rem;
  }
`;

export const Form = styled.form`
  width: 80%;
  height: 70%;
  margin: 0 auto;
  display: flex;
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Open Sans";
  margin: auto;
`;

export const WhiteBackgroundHeader = styled.h2`
  text-align: center;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

//Login
export const ColoredBackgroundHeader = styled.h2`
  color: white;
  font-family: "Open Sans";
  letter-spacing: 2px;
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  z-index: 100;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

export const LoginHeader = styled.h2`
  font-family: "Open Sans";
  letter-spacing: 2px;
  font-size: 1rem;
  margin-top: 0;
  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

// export const RightHeader = styled.h2`
//   font-family: "Open Sans";
//   letter-spacing: 2px;
//   font-size: 1rem;
//   margin-top: 0;
//   @media (min-width: 600px) {
//     font-size: 1.5rem;
//   }
// `;

export const LoginLeft = styled.div`
  width: 35%;
  height: 100%;
  margin-left: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  letter-spacing: 2px;
`;

export const LoginRight = styled.div`
  width: 65%;
  height: 100%;
  background: black;
  text-align: center;
  display: grid;
  grid-template-columns: 10% 10% 60% 10% 10%;
  grid-template-rows: 10% 25% 40% 10% 15%;
`;

//Register
export const RegLeft = styled.div`
  width: 35%;
  height: 100%;
  background: black;
  text-align: center;
  display: grid;
  grid-template-columns: 10% 10% 60% 10% 10%;
  grid-template-rows: 10% 25% 40% 10% 15%;
`;

export const RegRight = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  letter-spacing: 2px;
`;

export const RegTop = styled.div`
  color: white;
  font-family: "Open Sans";
  letter-spacing: 2px;
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  z-index: 100;
  font-size: 0.5rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`;
