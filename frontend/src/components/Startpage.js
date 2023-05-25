import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

export const Startpage = () => {
    return (
        <Box>
            <h1>This is the startpage</h1>

            <Link to="/register">
                <Button 
                    type="submit" 
                    variant="outlined"
                >           
                GO TO REGISTER
                </Button>
            </Link>
            
            <Link to="/login">
                <Button 
                    type="submit" 
                    variant="outlined"
                >           
                GO TO LOGIN
                </Button>
            </Link>

        </Box>
    )
}