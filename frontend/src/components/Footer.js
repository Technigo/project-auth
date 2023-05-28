import React from "react";
import { BottomNavigation, Typography, Link, Paper} from "@mui/material";
import footerIMG from "../assets/footerbkgrnd.png"

export const Footer = () => {
  return (
    <Paper sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "black",
        height: 0.07,
        backgroundImage: `url(${footerIMG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }} elevation={3}>
    <BottomNavigation
      sx={{
        backgroundColor: "transparent"
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        fontFamily="VT323, monospace"
        fontSize="1.2rem"
        fontWeight="700"
        paddingTop={1}
        textAlign="center"
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