import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

export const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);

  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin");
    }
  }, [accessToken, history]);

  return (
    <>
      <div>Hello, {name}</div>
      <Link to="/joke">hej</Link>
    </>
  );
};
