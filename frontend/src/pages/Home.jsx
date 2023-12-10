import { Link } from "react-router-dom";
import { Button } from "../components/Button"
import "./home.css";

export const Home = () => {

    return (
        <>
            <h1>Welcome to</h1>
            <img id="logo" src="/gifthive-logo.png" alt="logo" />
            <Link to="/getstarted"><Button className="primary" btnText="Get started" /></Link>
        </>
    )
}
