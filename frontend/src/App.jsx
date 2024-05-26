import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { SignLogInPage } from "./pages/SignLogInPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignLogInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};
