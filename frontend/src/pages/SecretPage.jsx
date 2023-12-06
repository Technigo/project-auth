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
      <TopSecretAnimation />
      <h2>Schhh! This is super duper</h2>
      <h1>TOP SECRET!</h1>
      <img src="/src/assets/puppy.jpg" />
    </StyledSecretPage>
  );
};
