import { Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { Home } from "../pages//home/Home";
import { Flowers } from "../pages/flowers/Flowers";
import { Profile } from "../pages/profile/Profile";
import { Cart } from "../pages/cart/Cart";
import { NotFound } from "../pages/NotFound";
import { ProfileForm } from "../pages/profile/ProfileForm";

export const routes = (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/profile/:id" element={<Profile />} />
    <Route path="/profile/:id/edit" element={<ProfileForm />} />
    <Route path="/flowers" element={<Flowers />} />
    <Route path="/cart/:id" element={<Cart />} />
    <Route path="*" element={<NotFound />} />
  </>
);
