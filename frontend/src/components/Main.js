import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { API_URL } from "utils/utils"
import thoughts from "reducers/thoughts"
import SignOut from "./SignOut"

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const thoughtItems = useSelector((store) => store.thoughts.items)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }

        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(thoughts.actions.setItems(data.response))
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setError(data.response))
                    dispatch(thoughts.actions.setItems([]))
                }
            })
    }, [])
    
    return (
        <>
        <h1>This is main</h1>
        {thoughtItems.map(item => {
            return <div key={item._id}>{item.message}</div>
        })}
        <SignOut />
        </>
    )
}

export default Main
