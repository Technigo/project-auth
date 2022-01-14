import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/url";
import order from "../reducers/order";

const Main = () => {
  // const [message, setMessage] = useState("");
  const orderMessage = useSelector((store) => store.order.message);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("order"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(order.actions.setMessage(data.response));
          dispatch(order.actions.setError(null));
        } else {
          dispatch(order.actions.setMessage(null));
          dispatch(order.actions.setError(data.response));
        }
      });
  }, [accessToken, orderMessage]);

  return (
    <div>
      <h1>Here is your order</h1>
      <p>{order.message}</p>
      {/* {orderItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))} */}
    </div>
  );
};

export default Main;
