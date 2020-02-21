import React, { useState, useEffect }from "react"

const URL = 'http://localhost:8080/users'

export const Profile = () => {
  const [name, setName] = useState("")
  const [authToken, setauthToken] = useState("")
  const [logIn, setLogin] = useState(false)

  useEffect(() => 
    fetch(`${URL}/${name}`, {
      method: 'GET',
      headers: [{'Content-type': 'application'}]
    }))
}

export const MemberPage = (props) => {
  return(
    <section>
      <h2>Member information</h2>
    </section>
  )
}