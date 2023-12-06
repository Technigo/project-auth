import styled from "styled-components";
import { TopSecretAnimation } from "../TopSecretAnimation";

const StyledSecretPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 400px;
    object-fit: cover;
  }
`;

export const SecretPage = () => {
  return (
    <StyledSecretPage>
      <h1>Schhh! This is super duper</h1>
      <TopSecretAnimation />
      <img src="/puppy.jpg" />
    </StyledSecretPage>
  );
};
