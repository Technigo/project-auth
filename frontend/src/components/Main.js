import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin");
    }
  }, [accessToken, history]);

  return <div>MAIN</div>;
};

export default Main;
