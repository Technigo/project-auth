import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Button, 
  Input, 
  RadioGroup, 
  Radio, 
  Stack, 
  Text, 
  FormControl 
} from "@chakra-ui/react"

import { API_URL } from "utils/utils";

import user from "reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(null);

  const [mode, setMode] = useState("register");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, password }),
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
            setValidationError(null);
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            setValidationError(data.response);
          });
        }
      });
  };

  return (
    <Container mt={20}>
      <Text fontSize='3xl'>Welcome Dude</Text>
      <RadioGroup mt={10} onChange={setMode} value={mode}>
        <Stack spacing={4} direction='row'>
          <label htmlFor="register"></label>
          <Radio
            value="register"
            type="radio"
            id="register"            
            checked={mode === "register"}
            onChange={() => setMode("register")}
          >Sign up
          </Radio>
          <label htmlFor="login"></label>
          <Radio
            value="login"
            type="radio"
            id="register"
            checked={mode === "login"}
            onChange={() => setMode("login")}
          >Sign in
          </Radio>
        </Stack>
      </RadioGroup>
      <FormControl onSubmit={onFormSubmit}>
        <div>
          <Input mt={5} 
            placeholder='Username'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Input mt={5} 
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {validationError !== null && (
          <p className="error-message">{validationError}</p>
        )}
        <Button colorScheme='blue' type="submit">Submit</Button>
      </FormControl>
    </Container>
  );
};

export default Login;