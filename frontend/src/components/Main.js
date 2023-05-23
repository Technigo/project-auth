import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const navigate = useNavigate();

    const logOutButton = () => {
        window.location.reload()
    }

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    return (
        <>
            <section>
                <div className="form-container">
                    <h1>Welcome page</h1>
                    <div>
                        <p>This is the secret page! Woop woop</p>
                    </div>
                    <div className="button-container">
                        <button className="logout-button" type="button"
                            onClick={logOutButton}>Log out</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Main;