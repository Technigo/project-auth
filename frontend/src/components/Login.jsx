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
  Text 
} from "@chakra-ui/react"

import { API_URL } from "utils/utils";

import user from "reducers/user";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [value, setValue] = useState("register");
  const dispatch = useDispatch();
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
    fetch(API_URL(value), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
            setValidationError('User created! Navigate to Sign in');
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
      <Text fontSize='4xl'>Welcome Dude</Text>
      <RadioGroup mt={5} onChange={setValue} value={value}>
        <Stack spacing={4} direction='row'>
          <Radio value="register">
            Sign up
          </Radio>
          <Radio value="login">
            Sign in
          </Radio>
        </Stack>
      </RadioGroup>
      <form onSubmit={onFormSubmit}>
          <Input mt={5} 
            placeholder='Username'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input mt={5} 
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {validationError !== null && (
          <p className="error-message">{validationError}</p>
        )}
        <Button colorScheme='blue' mt={5} type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default Login;