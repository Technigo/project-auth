import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/NotFound";
import { YourAds } from "../pages/YourAds";

export const routes = (
    <>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/YourAds" element={< YourAds/>} />
        <Route path="*" element={<NotFound />} />
    </>
);