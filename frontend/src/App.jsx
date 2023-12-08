import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

// Set up the routing and display the navigation links
export const App = () => {
  return (
    // Wrapping the entire app with BrowserRouter to enable client-side routing
    <>
      <BrowserRouter>
        {/* Defining the routes for the application */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};
