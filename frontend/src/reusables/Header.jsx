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
  height: 300px;

  @media all and (min-width: 744px) {
    height: 400px;
  }
  @media all and (min-width: 1024px) {
    flex-direction: row;
    width: 50%;
    height: 100vh;
  }
`;

const HeaderGlobe = styled.img`
  position: absolute;
  left: -34px;
  top: -34px;
  width: 280px;
  height: 280px;

  @media all and (min-width: 744px) {
    left: -44px;
    top: -44px;
    width: 380px;
    height: 380px;
  }
  @media all and (min-width: 1024px) {
    left: -60px;
    top: -60px;
    width: 58%;
    height: auto;
    max-width: 590px;
    max-height: 590px;
  }
`;
//component
export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderGlobe src={Globe} alt="globe with green background" />
    </HeaderContainer>
  );
};
