import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Headline } from "./GlobalComponents"

const NotFound = () => {
    return (
        <>
        <Link to="/login"> GO TO LOGIN</Link>
        <Headline>Not Found...</Headline>
        </>
    ) 
}

export default NotFound;