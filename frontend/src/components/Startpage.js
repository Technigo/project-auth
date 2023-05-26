import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Directions } from "@mui/icons-material";
import { grey } from "@mui/material/colors";


export const Startpage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1814&q=80")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    margin: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 500,
                    maxWidth: '80%',
                    padding: '20px',
                    color: 'white',
                    background: 'rgba(10, 10, 10, 0.5)'
                }}
            >
                <h1>Do yo wanna know a secret?</h1>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                        margin: '20px',
                    }}
                    >
                    <Link to="/register">
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
                        GO TO REGISTER
                        </Button>
                    </Link>

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
                </Box>

            </Box>
        </Box>
        
    )
}