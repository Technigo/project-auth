import { BrowserRouter, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { userStore } from "./stores/userStore";
import { routes } from "./routes/routes";

export const App = () => {

  // Initialize the application by checking for a stored userID in local storage.
  // This step ensures that the application's state, managed by userStore,
  // is synchronized with the persistent state stored in local storage.
  // If a userID is found, update the userStore's state with the retrieved userID.
  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      userStore.getState().setId(userID);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  );
};
