import { Link as RouterLink } from 'react-router-dom';
import styled from "styled-components";

const NavBar = styled.div`
  width: 100%; // Full width

  nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex; // Ensure the ul is also a flex container
    flex-direction: column; // Stack li items vertically on mobile
    align-items: flex-end; // Align li items to the end/right
    width: 100%;
  }

  li {
    text-decoration: none;
    list-style: none;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    nav {
      flex-direction: row;
      justify-content: flex-end;
    }

    ul {
      flex-direction: row; // Align li items in a row on larger screens
      align-items: center; // Center align li items vertically
    }

    li {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
`;

// Styled Link component
const StyledLink = styled(RouterLink)`
  color: #333; // Example text color
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: #555; // Example hover color
    text-decoration: underline; // Example hover effect
  }
`;


export const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <NavBar>
      <nav>
        <ul>
          {!isLoggedIn ? (
            // Show login and signup when not logged in
            <>
              <li>
                <StyledLink to="/login">Login</StyledLink>
              </li>
              <li>
                <StyledLink to="/register">Signup</StyledLink>
              </li>
            </>
          ) : (
            // Show user profile when logged in
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </NavBar>
  );
};
