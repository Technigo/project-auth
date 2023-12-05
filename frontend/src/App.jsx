import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Flowers } from "./pages/flowers/Flowers";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
