import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Container,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, batch } from "react-redux";
import { authenticated } from "reducers/auth";
import styled from "styled-components";
import triangle from "../assets/triangle_blue.png";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken = useSelector((state) => state.authenticated.authToken);

  //Use code below instead of line 49 "navigate("/home");" ?
  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken]);

  const userLogin = async (options) => {
    try {
      const fetch = await fetch(
        "https://project-auth-asm.herokuapp.com/login",
        options
      );
      const response = await fetch;
      console.log(response);
      if (data.success) {
        batch(() => {
          dispatch(authenticated.actions.setUserId(data.userId));
          dispatch(authenticated.actions.setError(null));
          dispatch(authenticated.actions.login(data.login));
          // dispatch(authenticated.actions.logout(data.logout));
        });
        //navigate("/home");
      } else if (!data.success) {
        console.log(error);
        batch(() => {
          dispatch(authenticated.actions.setUserId(null));
          dispatch(authenticated.actions.setError(data.response));
          // dispatch(authenticated.actions.login(null));
          dispatch(authenticated.actions.logout(data.logout));
          //dispatch(authenticated.actions.setLogin(null));
        });
        //setError(data.response);
      }
    } catch (error) {
      console.log(error);
      // setError(error.response)
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Logo src={triangle} alt="esoteric logo." />
          <Typography
            variant="h1"
            fontSize={24}
            fontWeight={500}
            textAlign="center"
            color="secondary"
          >
            Sign in
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required={true}
            // onChange={typeEmail}
            autoComplete="true"
            color="secondary"
            // sx={{ color: "text.primary" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required={true}
            color="secondary"
            // onChange={typePassword}
          />
          {/* {error.length > 0 && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )} */}
          <Button
            /*onClick={() => {userLogin}} */ variant="contained"
            fullWidth
            size="large"
            color="secondary"
          >
            LOGIN... ?
          </Button>
          <Divider />
          <Button onClick={() => navigate("/signup")} color="secondary">
            Are you new? Register here
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Signin;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 22px #fff);
  margin: 0 auto;
`;
