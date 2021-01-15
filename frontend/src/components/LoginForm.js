import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { user } from '../reducers/user'
import { Profile } from './Profile'

const LOGIN_URL = 'https://project-auth-cla-ellen.herokuapp.com/sessions'
const SIGNUP_URL = 'https://project-auth-cla-ellen.herokuapp.com/users'

export const LoginForm = () => {
    
        const dispatch = useDispatch();
        const accessToken = useSelector((store) => store.user.login.accessToken);
      
        const [name, setName] = useState("");
        const [password, setPassword] = useState("");
      
        const handleLoginSuccess = (loginResponse) => {
          console.log(loginResponse.id)
          dispatch(
            user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
          );
          dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
          dispatch(
            user.actions.setStatusMessage({ statusMessage: "Login success!" })
          );
        };
      
        const handleLoginFailed = (loginError) => {
          dispatch(user.actions.setAccessToken({ accessToken: null }));
          dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
        };
      
        // sign up
        const handleSignup = (event) => {
          event.preventDefault();
          
          fetch(SIGNUP_URL, {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              if (!res.ok) {
                throw "Signup failed";
              }
              return res.json()
            })
            .then((json) => handleLoginSuccess(json))
            .catch((err) => handleLoginFailed(err));
        };
      
        // log in
        const handleLogin = (event) => {
          event.preventDefault()
      
          fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              if (!res.ok) {
                throw "FAIL"
              }
              return res.json()
            })
            .then((json) => handleLoginSuccess(json))
            .catch((err) => handleLoginFailed(err))
        }
      
        if (accessToken) {
          return (
            <>
              <Profile />
            </>
          )
        };
      
        return (
          <div>
            <form>
              <h1>Sign Up</h1>
              <label>
                name:
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label>
                password:
                <input
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button type="submit" onClick={handleSignup}>
                SIGN UP
              </button>
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        );
      };

    
