import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box sx={{ width: 320 }}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export default LoadingSpinner;
