import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Container,
  Button,
  TextField,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
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
            Sign up
          </Typography>
          <Stack spacing={2} direction="row">
            <TextField
              label="First Name"
              variant="outlined"
              required={true}
              autoComplete="true"
              fullWidth
              // onChange={typeFirstname}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              required={true}
              autoComplete="true"
              fullWidth
              // onChange={typeLastname}
            />
          </Stack>
          <TextField
            label="Username"
            variant="outlined"
            required={true}
            autoComplete="true"
            fullWidth
            //   onChange={typeEmail}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required={true}
            fullWidth
            //   onChange={typePassword}
          />
          {/* Add text next to checkbox? */}
          {/* <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Join this site's community. Read more"
        /> */}
          {/* {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )} */}
          <Button variant="contained" fullWidth size="large">
            SIGN UP
          </Button>
          <Divider />
          <Button onClick={() => navigate("/signin")}>
            Already have an account? Sign in
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Signup;
