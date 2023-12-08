import React from "react"
import { Route } from "react-router-dom"
import { Landingpage } from "../Pages/Landingpage"
import { Loggedin } from "../Pages/Loggedin"

export const routes = (
    <>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/logged-In" element={<Loggedin />}></Route>
    </>
)