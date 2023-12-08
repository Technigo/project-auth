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
      <nav className="Nav-wrapper">
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home" >Home</Link>
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