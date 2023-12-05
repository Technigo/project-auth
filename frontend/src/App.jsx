import { BrowserRouter, NavLink, Routes } from "react-router-dom";

import "./index.css";

import routes from "./routes/routes";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
        <main>
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
