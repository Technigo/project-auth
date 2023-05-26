import React from "react";
import { BottomNavigation, Typography, Link, Paper} from "@mui/material";

export const Footer = () => {
  return (
    <Paper sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "black",
        height: 0.06
      }} elevation={3}>
    <BottomNavigation
    >
      <Typography
        variant="body1"
        color="text.secondary"
        fontFamily="VT323, monospace"
        paddingTop={2}
      >
        {"Made by "}
        <Link
          color="inherit"
          href="https://joannaphilips.se/"
          target="_blank"
          rel="noreferrer"
          alt="Joanna's portfolio"
        >
          Joanna Philips
        </Link>
        {" & "}
        <Link
          color="inherit"
          href="https://leothunellportfoliowebdev.netlify.app/"
          target="_blank"
          rel="noreferrer"
          alt="Leo's portfolio"
        >
          Leo Thunell
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </BottomNavigation>
    </Paper>
  );
};