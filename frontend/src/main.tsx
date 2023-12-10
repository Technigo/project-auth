import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/AppLayout.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { LogIn } from "./pages/LogIn.tsx";
import { SignOut } from "./pages/SignOut.tsx";
import { Home } from "./pages/Home.tsx";
import { Page404 } from "./pages/404.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <Page404 /> },
  {
    element: <AppLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
        errorElement: <Page404 />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Page404 />,
      },
      {
        path: "/login",
        element: <LogIn />,
        errorElement: <Page404 />,
      },
      {
        path: "/signout",
        element: <SignOut />,
        errorElement: <Page404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>
);
