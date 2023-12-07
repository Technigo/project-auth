import { Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { Home } from "../pages//home/Home";
import { Flowers } from "../pages/flowers/Flowers";
import { Profile } from "../pages/Profile";
import { Cart } from "../pages/Cart";
import { NotFound } from "../pages/NotFound";

export const routes = (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/flowers" element={<Flowers />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<NotFound />} />
  </>
);
