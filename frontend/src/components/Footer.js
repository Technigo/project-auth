import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PurpleFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6970f7;
  color: white;
  border-radius: 40% 40% 0px 0px / 10px;
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0;
`;

const Text = styled.h3`
  font-size: 14px;
  color: white;
  font-weight: 400;
  word-spacing: -1px;
`;

const LinkText = styled.p`
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  word-spacing: -5px;
  color: #ffffff;
  display: inline;
  :hover,
  :focus {
    color: #f780b1;
  }
`;

export const Footer = ({ footerText, linkText, linkTo }) => {
  return (
    <PurpleFooter>
      <Text>
        {footerText}
        <Link to={linkTo}>
          <LinkText> {linkText}</LinkText>
        </Link>
      </Text>
    </PurpleFooter>
  );
};
