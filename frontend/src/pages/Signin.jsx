import React, { useState } from "react";
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

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("")

  const userLogin = async (options) => {
    try { const fetch = await fetch("https://project-auth-asm.herokuapp.com/login", options);
      const response = await fetch;
      console.log(response)
    if (data.success) {
      navigate('/home')
    } else if (!data.success) {
      console.log(error)
      setError(data.response)
    }
    } catch (error) {
        console.log(error)
        // setError(error.response)
    }
}

  return (
    <>
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Typography
            variant="h1"
            fontSize={24}
            fontWeight={400}
            textAlign="center"
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
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required={true}
            // onChange={typePassword}
          />
          {/* {error.length > 0 && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )} */}
          <Button variant="contained" fullWidth size="large">
            SIGN IN
          </Button>
          <Divider />
          <Button onClick={() => navigate("/signup")}>New here? Sign up</Button>
        </Stack>
      </Container>
    </>
  );
};

export default Signin;
