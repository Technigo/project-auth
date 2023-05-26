import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1546709843-e35cf3d3002d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: 'grayscale(100%)' 
      }}
    >
      <Box
        sx={{
          margin: "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 500,
          maxWidth: "80%",
          padding: "20px",
          color: "white",
          background: "rgba(10, 10, 10, 0.6)",
        }}
      >
        <p>PAGE COULD NOT BE FOUND :(</p>

        <Box
          sx={{
            display: "flex",
            gap: "30px",
            margin: "20px",
          }}
        >
          <Link to="/login">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  color: "black",
                  borderColor: "black",
                  backgroundColor: "white",
                },
              }}
            >
              GO TO LOGIN
            </Button>
          </Link>

          <Link to="/">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  color: "black",
                  borderColor: "black",
                  backgroundColor: "white",
                },
              }}
            >
              GO TO STARTPAGE
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};