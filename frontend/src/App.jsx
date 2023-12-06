import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetStarted } from "./pages/GetStarted";
import { ErrorPage } from "./pages/ErrorPage";
import { Dashboard } from "./pages/Dashboard";
import { LogOut } from "./components/LogOut";
import { Home } from "./pages/Home";
import "./App.css"


export const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <LogOut />
    </BrowserRouter>
  );
};
