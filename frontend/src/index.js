import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import AuthService from "./service/auth";

const url = process.env.REACT_APP_BASE_URL;
const authService = new AuthService(url);

if (!url) {
  throw new Error("url Not Found");
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App authService={authService} />);
