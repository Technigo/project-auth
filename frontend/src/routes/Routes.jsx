import { Route } from "react-router-dom"

import { Homepage } from "../Pages/Homepage/Homepage"
import { LoggedInPage } from "../Pages/LoggedInPage/LoggedInPage"

export const routes = (
    <>
     <Route path="/" element={<Homepage />}></Route>
     <Route path="/loggedIn" element={<LoggedInPage/>}></Route>
    </>
)
