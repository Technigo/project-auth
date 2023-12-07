import { Route } from "react-router-dom"

import { Homepage } from "../Pages/Homepage/Homepage"
import { Secretpage } from "../Pages/Secretpage/Secretpage";

export const routes = (
    <>
     <Route path="/" element={<Homepage />}></Route>
     <Route path="/secret" element={<Secretpage/>}></Route>
    </>
);
