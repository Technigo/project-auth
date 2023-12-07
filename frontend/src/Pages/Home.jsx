import { userStore } from "../Stores/userStore";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import { useEffect } from "react";

export const Home = () => {
  const text = {
    heading: "Big Heading here",
    subheading: "Home Page",
  };
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Function to handle the click event of the logout button
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here
    alert("Log out successful");
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      <p>Welcome to the Home Page!</p>
      {/* Add more content relevant to the home page here */}
    </>
  );
};
