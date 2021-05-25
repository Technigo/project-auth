import React from "react";
import Index from "./pages/Index";
import { BrowserRouter, Route } from "react-router-dom";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path='/' component={Index} />
      </BrowserRouter>
    </>
  );
};
