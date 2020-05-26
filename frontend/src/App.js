import React, { useState } from 'react'


const URL = "http://localhost:8080/users";

export const App = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div>
      Find me in src/app.js!
    </div>
  )
}
