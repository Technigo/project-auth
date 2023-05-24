import React from "react";
import { BottomNavigation, BottomNavigationAction, Typography, Paper} from "@mui/material";

export const Footer = () => {
    return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, color: 'black', height: 0.06 }} elevation={3}>
        <BottomNavigation
        showLabels >
        <Typography variant="body2" color="text.secondary" justifyContent="center" display="flex" alignItems="center" >Made by</Typography>
        <BottomNavigationAction
            label="Joanna Philips" 
            href="https://joannaphilips.se/"
            target="_blank"
            rel="noreferrer"
            alt="Joannas portfolio" />
        <BottomNavigationAction
            label="Leo Thunell"
            href="https://leothunellportfoliowebdev.netlify.app/"
            target="_blank"
            rel="noreferrer"
            alt="Leos portfolio" />
        </BottomNavigation>
    </Paper>
    );
}