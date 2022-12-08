import React, { useState, useEffect } from "react";
import { useDispatch, /*useSelector*/ } from 'react-redux';


const Main = () => {
  const [secret, setsecret] = useState("");

  const dispatch = useDispatch()
  // const userStart = useSelector((store) => store.user.username)

  return (
    <div className="secret-page">
      <h1>It's a secret!</h1>
      <button className="button-logout">
        Logout
      </button>
    </div>
  );
};

export default Main;
