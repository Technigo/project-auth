import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { users } from "../reducers/users";

export const Start = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const error = useSelector((state) => state.users.error);

    const checkError = () => {
        if (typeof error.error === "string") {
            return error.error;
        } else {
            return error.response;
        }
    };

    const onSignInClick = () => {
      navigate("/signin")
      dispatch(users.actions.setError(null))
    }

    return (
        <div className="container">
            <h1>Riddle master?</h1>
            <p>Climb the security levels and solve them all</p>
            <button type="button" onClick={onSignInClick}>
                Sign up/Log in
            </button>
            <button type="button" onClick={() => navigate("/riddles")}>
                Solve a riddle
            </button>
            {error && <h1>{checkError()}</h1>}
        </div>
    );
};
