import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null));
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response));
                }
            })
    }, []);

    return (
        <>
          <h2>This is the main component</h2>
            {thoughtItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
          })}
        </>
    )
}

export default Main;