import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

export const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin");
    }
  }, [accessToken, history]);

  return (
    <>
      <div>Hello, {username}</div>
      <Link to="/joke">hej</Link>
    </>
  );
};
