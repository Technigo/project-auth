import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/triangle.png";
import { Button, Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "reducers/auth";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openNav = Boolean(anchorEl);
  const displayName = useSelector((store) => store.authenticated.username);
  const dispatch = useDispatch();

  const openNavigation = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(authenticated.actions.logout());
  };

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="logo navigation." />
      <Button
        id="nav-button"
        aria-controls={openNav ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openNav ? "true" : undefined}
        onClick={openNavigation}
        color="secondary"
      >
        {displayName}
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        open={openNav}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "nav-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 2vh 3vh;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 0 22px #fff);
`;
