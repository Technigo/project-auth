import { Link } from "react-router-dom";
import "../styling/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navContainer">
        <div className="navTitleSection">
          <img src="/LogoIcon.png" alt="Cat icon" className="logoIcon" />
          <h1 className="navTitle">Cute kitties</h1>
        </div>
        <ul className="navList">
          <li className="navItem">
            <Link to="/" className="navLink">
              Home
            </Link>
          </li>
          <li className="navItem">
            <Link to="/register" className="navLink">
              Register
            </Link>
          </li>
          <li className="navItem">
            <Link to="/login" className="navLink">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
