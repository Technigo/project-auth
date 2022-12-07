import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import user from "../reducers/user";
import { BASE_URL } from "../utils/urls";

const LogIn = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const accessToken = useSelector((store) => store.user.accessToken)
}

// from previus project:
/* const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: new, message: newThought })
    })
      .then((res) => res.json())
      .then((data => {
        setNewThought((previousThoughts) => [newUserThought, ...previousThoughts])
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setNewThought('')
        setNewName('')
        fetchThoughts()
      })
  } */