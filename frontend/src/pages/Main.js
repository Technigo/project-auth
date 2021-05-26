import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

import { Footer } from "../components/Footer";

import user from "../reducers/user";

const Header = styled.h1`
  text-align: center;
  color: #83868e;
  padding: 0 40px;
`

const Button = styled.button`
  padding: 15px 30px;
  width: 100%;
  border-radius: 40px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #f780b1;
  outline: none;
  cursor: pointer;
  background-color: #f780b1;
  color: #ffffff;
  font-family: "Padauk", sans-serif;
  letter-spacing: 1.5px;
  margin-top: 20px;
  :hover,
  :focus {
    color: #f780b1;
    background-color: #f2f3ff;
  }
`;

export const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin");
    }
  }, [accessToken, history]);

  return (
    <>
      <Header>Hello, {username}. Ready for some jokes?</Header>
      <Link to="/joke">
        <Button>YES!</Button>
      </Link>
      <Footer
        footerText="Changed your mind?"
        linkText="Sign Out"
        linkTo="/signin"
        onClick={() => dispatch(user.actions.setLogOut())}
      />
    </>
  );
};
