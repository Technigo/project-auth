import React from "react";
import { Link } from "react-router-dom";
import  Svg from "../images/donut.svg"

const NotFound = () => {
    return (
        <><Link to="/login"> GO TO LOGIN</Link>
        <img src={Svg} alt="Italian Trulli" />
        <h1>Not Found...</h1></>)
}

export default NotFound;