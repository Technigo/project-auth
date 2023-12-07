import { userStore } from "../Stores/userStore";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import { useEffect } from "react";

export const Home = () => {
  const username = userStore((state) => state.username);

  const welcomeMessage = `
  👨‍💻 Congrats on a successful login, ${username}! Welcome to Devtopia! 🌐

  Your journey through the maze of authentication has led you to a land where 
  'null' is not nothing, and every '404' is a hidden opportunity. You've proven 
  your worthiness by bypassing the formidable Login Dragon. Here’s what awaits 
  you in this coder’s paradise:
  - A sandbox where 'undefined' is a badge of honor.
  - A treasure trove of extra curly braces and semicolons – because you can 
    never have too many.
  - Endless refills of the elixir of life, also known as coffee, to fuel those 
    late-night coding sessions.

  Remember, in Devtopia, we navigate by 'console.log()' and believe that every 
  bug is just an undocumented feature in disguise.

  Happy Coding, intrepid explorer!
`;

  const text = {
    heading: "This is a super secret page!!!",
    subheading: welcomeMessage,
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
