import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login"; // Adjust the import path as needed
import { NotFound } from "./pages/NotFound"; // Adjust the import path as needed
import { Home } from "./pages/Home";
// Import other components as needed

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};



