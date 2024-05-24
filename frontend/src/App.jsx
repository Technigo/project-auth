import { Footer } from "./Components/Footer";
import { HomePage } from "./Components/HomePage";
import "./App.css"
import { Header } from "./Components/Header";

export const App = () => {
  return ( 
  <div className="app-container">
    <Header />
    <HomePage />
    <Footer />
  </div>
  )
};
