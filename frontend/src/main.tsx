import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/AppLayout.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { LogIn } from "./pages/LogIn.tsx";
import { SignOut } from "./pages/SignOut.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
        // errorElement: <Error />,
      },
      {
        path: "/login",
        element: <LogIn />,
        // errorElement: <Error />,
      },
      {
        path: "/signout",
        element: <SignOut />,
        // errorElement: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>
);
