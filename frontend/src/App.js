import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Welcome } from "./components/Welcome";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Content } from "./components/Content";

export const App = () => {
  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <main>
          <Nav />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content" element={<Content />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
