import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, user, loginUser } from "./reducers/user";

const Login = () => {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  const mode = useSelector(store => store.user.mode);
  console.log(mode, username, password, email)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(store => store.user.accessToken);
  useEffect(() => {
   if(accessToken){
      navigate("/")
   }
  }, [accessToken]);
const onFormSubmit = (event)=>{
event.preventDefault()
if(mode==='register'){
dispatch(registerUser(username, email, password))
}else if(mode==='login'){
   dispatch(loginUser(email, password))
}
}
     return(
      <>  
      <label htmlFor="register">Register</label>
      <input 
          type="radio" 
          id="register" 
          checked={mode === "register"}
          onChange={() => dispatch(user.actions.setMode("register"))}/>
      <label htmlFor="login">Login</label>
      <input 
          type="radio" 
          id="login" 
          checked={mode === "login"}
          onChange={() => dispatch(user.actions.setMode("login"))}/>
      <form onSubmit={onFormSubmit}>
          <label htmlFor="username">Username</label>
          <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input 
              type="text" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} />
          <button type="submit">Submit</button>
  </form>
  </>
     );
};

export default Login