import React from "react";
import styled from "styled-components/macro";
import { PrimaryButton } from "./PrimaryButton";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
`;

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,
    rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  border-radius: 6px;
  max-width: 300px;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const SecondaryText = styled.p`
  font-size: 18px;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
`;

export const Dialog = ({
  title,
  onClose,
  buttonText,
  secondaryText,
  secondaryButtonText,
  image,
  username,
}) => (
  <BackgroundContainer>
    <DialogContainer>
      {title && <Title>{title}</Title>}
      <div>
        {buttonText && (
          <PrimaryButton small title={buttonText} onClick={onClose} />
        )}
        {secondaryButtonText && (
          <PrimaryButton small title={secondaryButtonText} onClick={onClose} />
        )}
      </div>
    </DialogContainer>
  </BackgroundContainer>
);
