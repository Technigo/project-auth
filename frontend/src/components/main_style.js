import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
`;

export const Title = styled.h1`
  font-size: 30px;
  letter-spacing: 3px;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

export const Date = styled.h1`
  font-size: 20px;
  letter-spacing: 3px;
  text-align: center;
`;
export const SignOutButton = styled.button`
  position: absolute;
  left: 20px;
  top: 10px;
  font-size: 16px;
  padding: 10px 15px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 0.12em;
  background-color: #22c1c3;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  transition: all 0.15s;
  &:hover {
    text-shadow: 0 0 2em rgba(255, 255, 255, 1);
    color: #fff;
    border-color: #ffce54;
  }
`;
