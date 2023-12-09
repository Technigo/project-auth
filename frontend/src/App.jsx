import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { ErrorPage } from "./pages/ErrorPage";
import { SecretPage } from "./pages/SecretPage.jsx";
import { Home } from "./pages/Home";



export const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/secretpage" element={<SecretPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};