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
  height: 50px;
  margin: 0;
  position: fixed;
  bottom: 0;
  @media (min-width: 768px) {
    height: 80px;
  } ;
`;

const Text = styled.h3`
  font-size: 14px;
  color: white;
  font-weight: 400;
  @media (min-width: 768px) {
    font-size: 18px;
  } ;
`;

const LinkText = styled.a`
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  display: inline;
  margin-left: 3px;
`;

export const Footer = ({ footerText, linkText, linkTo, onClick }) => {
  return (
    <PurpleFooter>
      <Text>
        {footerText}
        <LinkText>
          <Link to={linkTo} onClick={onClick}>
            {linkText}
          </Link>
        </LinkText>
      </Text>
    </PurpleFooter>
  );
};
