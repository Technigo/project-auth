import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { Dashboard } from "./components/Dashboard";
import { Homepage } from "./components/Homepage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};
