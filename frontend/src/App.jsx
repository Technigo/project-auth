import { BrowserRouter, Routes, Link } from "react-router-dom";
import { Register } from "./Register";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </>
  );
};
