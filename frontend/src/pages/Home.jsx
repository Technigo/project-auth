import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import Logos from "../components/Logos";
import { Link } from "react-router-dom";

export const Home = () => {
  const text = {
    heading: "Project-Auth",
    subheading: "Home Page",
    intro: "The task involves creating a full-stack application with a backend API and a React frontend for a task management app. The backend API should have endpoints for user registration, user login, and an authenticated endpoint that returns content accessible only to logged-in users. The frontend needs to include registration and sign-in forms, a page to display authenticated content, and a sign-out button. Key requirements include bcrypt-encrypted passwords, proper handling of authentication errors, and validation of user input. Stretch goals involve storing data in the database, enhancing error messaging in the frontend, implementing Google authentication with Firebase, adding more routes for logged-in users, and improving backend validations for unique email addresses and email format. Advanced stretch goals include creating additional routes for database operations and further enhancing backend validations. The technology stack includes Vite, React, React Router, and minimal CSS. The focus is on building a secure and functional task app with both essential and optional features to improve the overall user experience."
  };
  const storeHandleLogout = userStore((state) => state.handleLogout);

  const { isLoggedIn } = userStore();
  console.log(isLoggedIn);
  
  const navigate = useNavigate();
  if (!isLoggedIn) {
    
    alert("no permission");
    navigate("/register"); 
  }

  
  const onLogoutClick = () => {
    storeHandleLogout();
    
    alert("Log out succesfull");
    navigate("/"); 
  };

  return (
    <>
      <nav className="app-button-wrapper">
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home" className="app-link">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks" className="app-link">Tasks</Link>
          </li>
          <div className="app-button-li">
          <li className="app-li">
            <button onClick={onLogoutClick} className="app-button">Sign Out</button>
          </li>
          </div>
        </ul>
      </nav>
      <Logos />
      <div className="card-container">
      <h1 className="heading">{text.heading}</h1>
      <h2>{text.subheading}</h2>
      <p>{text.intro}</p>
      </div>
    </>
  );
};