import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Container, Button, Text } from "@chakra-ui/react"

import user from "reducers/user"



const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const username = useSelector((store) => store.user.username)

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken])

  return (
    <Container mt={20}>
      <Text fontSize="3xl">
        Congratulations and welcome to your page {username}!
      </Text>
      <Text mt={5} fontSize="2xl">You have erned yourself a beer 🍺</Text>
      <Button
        mt={5}
        colorScheme="blue"
        type="button"
        onClick={() => {
          navigate("/login")
          dispatch(user.actions.setAccessToken(null))
        }}
      >
        Log out
      </Button>
    </Container>
  )
}

export default Main
