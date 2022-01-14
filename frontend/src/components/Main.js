import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { API_URL } from "../utils/constants"
import thoughts from "../reducers/thoughts"
import user from "reducers/user"

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items)
  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response))
          dispatch(thoughts.actions.setError(null))
        } else {
          dispatch(thoughts.actions.setItems([]))
          dispatch(thoughts.actions.setError(data.response))
        }
      })
  }, [accessToken, dispatch])

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem("user")
    })
  }

  return (
    <section className="secrets-container">
      <div>
        <div>
          <Link to="/login"> Back to Sign in page</Link>
        </div>
        <h1>welcome to the chamber of secrets..</h1>
        {thoughtsItems.map((item) => (
          <div key={item._id}>{item.message}</div>
        ))}
      </div>
      <button className="logout-btn" onClick={logOutUser}>
        Log out
      </button>
    </section>
  )
}

export default Main
