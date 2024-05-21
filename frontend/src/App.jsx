import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StartPage } from "./components/StartPage.jsx";
import { LoginPage } from "./components/LoginPage.jsx";
import { SignUpPage } from "./components/SignUpPage.jsx";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};