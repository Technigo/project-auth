import React from 'react';

import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterDiv>
      <FooterText>This is a project made by Gabriella Bolin & Sara Stjernberg @Technigo Bootcamp January 2021</FooterText>
    </FooterDiv>
  );
};

const FooterDiv = styled.footer`
  margin: 20px;
  display: flex;
  align-items: center;
  bottom: 0;
`;

const FooterText = styled.p`
  font-size: 12px;
  text-align: center;
  color: #fff;
`;