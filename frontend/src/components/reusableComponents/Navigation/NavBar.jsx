import styled from "styled-components";
import { Burger } from "./Burger";

const Nav = styled.nav`
  width: 90%;
  height: 55px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 20px;

  }
`


export const Navbar = ({ isLoggedIn, toggleDarkMode, handleLogout }) => {
  return (
    <Nav>
      <div className="logo">
        LOGO
      </div>
      <Burger isLoggedIn={isLoggedIn} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
    </Nav>
  );
};
