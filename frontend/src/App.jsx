import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetStarted } from "./pages/GetStarted";
import { Register } from "./pages/Register.jsx";
import { ErrorPage } from "./pages/ErrorPage";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import "./app.css"


export const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
