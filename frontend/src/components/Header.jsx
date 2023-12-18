import { Navbar } from "./NavBar";
import "../index.css";


export const Header = () => {
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header>
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        Dark Mode
      </button>
      <Navbar />
    </header>
  );
};
