import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { LoggedinPage} from "../pages/LoggedinPage"

export const routes = (
    <>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/logged-In" element={<LoggedinPage />}></Route>
    </>
)