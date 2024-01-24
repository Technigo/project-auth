import { Navbar } from "../components/reusableComponents/Navigation/NavBar"
import { ImageSwapper } from "../components/ImageSwapper"
import styled from "styled-components";

const LandingPage = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto; // Center horizontally
  align-items: center; // Center children horizontally within LandingPage
`;


export const Landing = () => {
  return (
    <>
      <LandingPage>
        <Navbar />
        <ImageSwapper />
      </LandingPage>
    </>
  )
}
