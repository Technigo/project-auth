import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
//import thoughts from "reducers/thoughts";

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const dispatch = useDispatch();



    return (
        <h1>You are logged in</h1>
    )
};

export default Main;