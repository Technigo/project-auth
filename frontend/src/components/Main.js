import React, { useState, useEffect } from "react";


import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux'

const Main = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    // const userStart = useSelector((store) => store.user.username)

  
  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onFormSubmit}>
         <label htmlFor="username">Username: </label>
      <Input
        type="text"
        placeholder="🖊️ Write your username here"
        value={username}
        onChange={(e) => handleChange(e)}
        className="input" />
        <label htmlFor="password">Password: </label>
        <Input
        type="text"
        placeholder="🖊️ Write your password here"
        value={password}
        onChange={(e) => handleChange(e)}
        className="input" />
      <Button className="submit-btn" type="submit">Submit</Button>
    </form>
    )
}

export default Main;
