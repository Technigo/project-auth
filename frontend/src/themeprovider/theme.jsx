import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff3a86",
      contrastText: "white",
    },
    secondary: {
      main: "#8338ec",
      contrastText: "white",
    },
    success: {
      main: "#64C800",
      contrastText: "white",
    },
    info: {
      main: "#3a86ff",
      contrastText: "white",
    },
    error: {
      main: "#fb5607",
      contrastText: "white",
    },
    warning: {
      main: "#ffbe0b",
      contrastText: "white",
    },
  },
});
