import { Header } from "../components/Header"
import { ImageSwapper } from "../components/ImageSwapper"
import styled from "styled-components";

const LandingPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Landing = () => {
  return (
    <>
      <LandingPage>
        <Header />
        <ImageSwapper />
      </LandingPage>
    </>
  )
}
