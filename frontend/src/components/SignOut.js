import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import user from "reducers/user"

const SignOut = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeToken = () => {
        dispatch(user.actions.setAccessToken(null))
        navigate("/login")
    }

    return (
        <button onClick={() => removeToken()}>Sign out</button>
    )

}

export default SignOut
