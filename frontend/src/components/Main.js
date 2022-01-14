import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"
import user from "../reducers/user"

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken, navigate])

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   }

  // }, [accessToken, dispatch])

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setAccessToken(null))
    })
  }

  return (
    <div>
      <h3>Here is the secret message! </h3>
      <img
        alt="doit"
        src="https://c.tenor.com/wPwsT9YWDfQAAAAC/kermit-darkside.gif"
      ></img>

      <div>
        {accessToken && (
          <>
            <button className="logout-button" onClick={onButtonClick}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Main
