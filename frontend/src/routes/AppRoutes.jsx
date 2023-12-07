import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}