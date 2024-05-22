//imports
import styled from "styled-components";
import HeaderPicture from "../../public/header.jpg";
import Globe from "../../public/globe.png";

//styles
const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${HeaderPicture});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;

  @media all and (min-width: 744px) {
    height: 500px;
  }
  @media all and (min-width: 1024px) {
    flex-direction: row;
    width: 50%;
  }
`;

const HeaderGlobe = styled.img`
  position: absolute;
  left: -44px;
  top: -44px;
  width: 320px;
  height: 320px;

  @media all and (min-width: 744px) {
    width: 380px;
    height: 380px;
  }
  /* @media all and (min-width: 1024px) {

  } */
`;

const HeaderSlogan = styled.h1`
  font-family: Abril Fatface, serif;
  font-weight: 400;
  font-size: 2em;
  color: var(--grey);
  /* background: var(--darkgreen); */
  margin: 20px 0;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

  @media all and (min-width: 744px) {
    font-size: 2.5em; // Adjust font size for larger screens
  }
  @media all and (min-width: 1024px) {
    font-size: 3em; // Adjust font size for larger screens
  }
`;

//component
export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderGlobe src={Globe} alt="globe with green background" />
      <HeaderSlogan>
        STEP OUT, STEP UP <br />
        eGO GREEN
      </HeaderSlogan>
    </HeaderContainer>
  );
};
