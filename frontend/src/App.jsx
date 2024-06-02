// Import code from movie-project
// here i import the componets 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { PrivatePage } from "./PrivatePage";

// https://reactrouter.com/
// here setting up routes for the app
export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/private" element={<PrivatePage />} />
    </Routes>
  </Router>
);
