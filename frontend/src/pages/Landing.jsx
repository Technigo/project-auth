import { Header } from "../components/Header"
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
      <Header />
      <LandingPage>
        <ImageSwapper />
      </LandingPage>
    </>
  )
}
