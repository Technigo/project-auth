import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";

import notes from "reducers/notes";
import user from "reducers/user";

import Button from "@mui/material/Button";

const Notes = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const noteItems = useSelector((store) => store.notes.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!accessToken) {
            navigate("/");
        }
    }, [accessToken]);

    useEffect(() => {
        const options ={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }

        fetch(API_URL("notes"), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch(notes.actions.setItems(data.response));
                dispatch(notes.actions.setError(null));
            } else {
                dispatch(notes.actions.setError(data.response));
                dispatch(notes.actions.setItems([]));
            }
        })
    }, []);

    return (
        <>
            <div className="container">
                {noteItems.map((item) => {
                    return <div key={item._id}>
                        <p className="notes">{item.message}</p>
                        </div>
                })}
                <Button variant="contained" onClick={() => {
                    dispatch(user.actions.setAccessToken(null))
                }}
                >
                    Log out
                </Button>
            </div>
        </>
    )
};

export default Notes;
