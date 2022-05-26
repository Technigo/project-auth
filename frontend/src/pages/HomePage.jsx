import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";

// import { authenticated } from "reducers/auth";

const HomePage = () => {
  const authToken = useSelector((state) => state.authenticated.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken]);

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": authToken
  //     }
  //   }
  // })

  // fetch(,options)

  return (
    <>
      <Header />
      <div className="scene">
        <div className="wrapper">
          <ul className="ball">
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
            <li className="ring"></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
