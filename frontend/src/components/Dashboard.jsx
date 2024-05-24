//imports
import styled from "styled-components";
import { Button } from "../reusables/Button";
import Globe from "../../public/globe.png";
import HeaderPicture from "../../public/header.jpg";
import { useNavigate } from "react-router-dom";

//styling
const DashboardSection = styled.section`
  display: flex;
  flex-direction: column;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  background-image: url(${HeaderPicture});
  background-size: cover;
  background-position: center;
  justify-content: space-between;
  align-items: center;

  @media all and (min-width: 1024px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    width: 30%;
    height: 100vh;
  }
`;

const DashboardGlobe = styled.img`
  height: 70px;
  width: 70px;
  margin: 20px;
  @media all and (min-width: 1024px) {
    height: 250px;
    width: 250px;
  }
`;

const ContentWrapper = styled.div`
  background: var(--grey);
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 50px;
  padding: 20px;
  @media all and (min-width: 1024px) {
  }
`;

const StyledButton = styled(Button)`
  width: 250px;
`;

//component
export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    //navigate to homepage
    navigate("/");
  };

  return (
    <DashboardSection>
      <DashboardHeader>
        <DashboardGlobe src={Globe} alt="globe with green background" />
        <StyledButton onClick={handleLogout}>Log out</StyledButton>
      </DashboardHeader>
      <ContentWrapper>
        <h1>Welcome</h1>
        <p>🤫 This is only shown to logged in users 🤫 </p>
        <p>👇</p>
        <p>👇</p>
        <p>👇</p>
        <p>
          Here we will show the dashboard with all your travel data, points and
          distances.
        </p>
      </ContentWrapper>
    </DashboardSection>
  );
};
