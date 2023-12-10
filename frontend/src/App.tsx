import "@fontsource/inter";
import { Typography } from "@mui/joy";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography level="h1" sx={{ color: "#042f2e", marginBottom: "30px" }}>
        🌸 SgifigS 🌸
      </Typography>
      <Button variant="outlined" color="success" onClick={() => navigate("/login")}>
        Start Here
      </Button>
    </div>
  );
};
