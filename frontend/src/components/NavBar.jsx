import { Link } from 'react-router-dom'; 

export const Navbar = ({ isLoggedIn, username, handleLogout }) => {
  return (
    <nav>
      <ul>
        {!isLoggedIn ? (
          // Show login and signup when not logged in
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </>
        ) : (
          // Show user profile when logged in
          <li>
            <Link to="/profile">{username}</Link>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};