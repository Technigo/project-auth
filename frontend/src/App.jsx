import { Footer } from "./Components/Footer";
import { HomePage } from "./Components/HomePage";
import { Header } from "./Components/Header";
import "./App.css"

export const App = () => {
  return ( 
  <div className="app-container">
    <Header />
    <HomePage />
    <Footer />
  </div>
  )
};
