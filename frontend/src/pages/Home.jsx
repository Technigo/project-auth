import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import Logos from "../components/Logos";
import { Link } from "react-router-dom";

export const Home = () => {
  const text = {
    heading: "Vite + React + React Router + Minimal CSS",
    subheading: "Home Page",
  };
  const storeHandleLogout = userStore((state) => state.handleLogout);

  const { isLoggedIn } = userStore();
  console.log(isLoggedIn);
  // You can use the useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  if (!isLoggedIn) {
    // If the user is not logged in, you can navigate to a different route or display a login page
    alert("no permission");
    navigate("/register"); // You can change this to the login route
  }

  // Function to handle the click event of the logout button
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here
    alert("Log out succesfull");
    navigate("/"); // You can change this to the login route
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="app-li">
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      <Logos />
      <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      <p>{text.intro}</p>
    </>
  );
};