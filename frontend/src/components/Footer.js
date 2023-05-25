import React from "react";
import { BottomNavigation, Typography, Link} from "@mui/material";

export const Footer = () => {
  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "black",
        height: 0.06,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        fontFamily="VT323, monospace"
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
  );
};