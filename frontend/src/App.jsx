import { BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { routes } from "./routes/routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};
