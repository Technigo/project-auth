import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    background: {
      paper: "#fff",
    },
    // text: {
    //   primary: "#fff",
    //   secondary: "#000",
    // },
    primary: {
      main: "#92594d",
      contrastText: "white",
    },
    secondary: {
      main: "#2e6f95",
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
