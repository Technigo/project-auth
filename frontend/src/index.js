import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import AuthService from "./service/auth";

const authService = new AuthService();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App authService={authService} />);
