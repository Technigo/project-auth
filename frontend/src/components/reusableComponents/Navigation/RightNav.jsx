import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

// Styling for RouterLink
const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  font-weight: 600;
  color: inherit; // Inherit color from parent
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 20px;
  }

  li a {
    text-decoration: none;
    font-weight: 600;
    color: inherit; // Inherit color from parent
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #FFF; // Menu Background Color
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #333; // Text Color
    }
  }
`;

export const RightNav = ({ open, isLoggedIn, handleLogout }) => {
    return (
        <Ul open={open}>
            {!isLoggedIn ? (
                <>
                    <li>
                        <StyledRouterLink to="/login">Login</StyledRouterLink>
                    </li>
                    <li>
                        <StyledRouterLink to="/register">Signup</StyledRouterLink>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <StyledRouterLink to="/YourAds">Your Ads</StyledRouterLink>
                    </li>
                    <li>
                        <a onClick={handleLogout}>Sign Out</a>
                    </li>
                </>
            )}
        </Ul>
    );
};
