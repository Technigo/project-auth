import { userStore } from "../Stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const text = {
    heading: "Big Heading here",
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
    navigate("/sessions"); // You can change this to the login route
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
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      <p>{text.intro}</p>
    </>
  );
};
