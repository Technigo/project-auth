import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      Page Not found
      <Button
        onClick={() => navigate("/")}
        color="secondary"
        variant="contained"
      >
        Home
      </Button>
    </>
  );
};

export default NotFound;
