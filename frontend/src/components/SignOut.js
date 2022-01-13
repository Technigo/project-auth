import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { users } from "../reducers/users";

export const SignOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSignOut = () => {
        dispatch(users.actions.setUserToLoggedOut());
        navigate("/");
    };

    return <button onClick={onSignOut}>Sign out</button>;
};
