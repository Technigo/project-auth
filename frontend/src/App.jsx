// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./routes/RoutesComp";
import "./index.css";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="wrapper">
          <Routes>{routes}</Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
