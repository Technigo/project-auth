import React, { useEffect } from "react";
import { batch, useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { API_URL } from "utils/utils";

import user from "reducers/user";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const secret = useSelector((store) => store.user.secret);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(API_URL("secret"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
          dispatch(user.actions.setSecret(data.secret));
          dispatch(user.actions.setError(null));
        });
        } else {
          dispatch(user.actions.setError(data.response));
        }
      });
  } 
},[accessToken, dispatch]);

  const logOut = () => {
    window.location.reload();
  };

  return (
    <section className="container">
      <h1>{secret}</h1>
      <iframe
        src="https://giphy.com/embed/yrhhmre5fN2PtRujfo"
        width="480"
        height="480"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      />
    
      <div>
        <button onClick={logOut}>Log out</button>
      </div>
    </section>
  );
};

export default Main;
