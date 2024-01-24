import styled from "styled-components";
import { Burger } from "./Burger";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 20px;
  }

  .logo img {
    width: 150px;
  }
`


export const Navbar = ({ isLoggedIn, toggleDarkMode, handleLogout }) => {
  return (
    <Nav>
      <div className="logo">
        <img src="/icons/sneaks-logo.png" />
      </div>
      <Burger isLoggedIn={isLoggedIn} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
    </Nav>
  );
};
