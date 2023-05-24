import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items)
    const dispatch = useDispatch()

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(API_URL(), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    })
    return(
        <p>I am the Main component</p>
    )
}

export default Main