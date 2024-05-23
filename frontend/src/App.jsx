import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { Registration } from "./components/Registration";
import { Dashboard } from "./components/Dashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
