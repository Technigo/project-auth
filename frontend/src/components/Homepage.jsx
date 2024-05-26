//import
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderPicture from "../../public/header.jpg";
import Globe from "../../public/globe.png";
import { Button } from "../reusables/Button";

//styling
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${HeaderPicture});
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 20px 0;
`;

const HeaderGlobeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const HeaderGlobe = styled.img`
  width: 280px;
  height: 280px;

  @media all and (min-width: 744px) {
    width: 400px;
    height: 400px;
  }
`;

const BottomForm = styled.div`
  background: var(--yellow);
  position: fixed;
  z-index: 0;
  bottom: 0;
  width: 280px;
  height: 140px;
  border-radius: 140px 140px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media all and (min-width: 744px) {
    width: 400px;
    height: 200px;
    border-radius: 200px 200px 0 0;
  }
`;

const ActionButton = styled(Button)`
  position: relative;
  z-index: 1;
`;

//component
export const Homepage = () => {
  return (
    <StyledSection>
      <Link to={`/login`}>
        <Button>Log in</Button>
      </Link>
      <HeaderGlobeContainer>
        <HeaderGlobe src={Globe} alt="globe with green background" />
      </HeaderGlobeContainer>
      <Link to={`/registration`}>
        <ActionButton>Take action</ActionButton>
      </Link>
      <BottomForm />
    </StyledSection>
  );
};
