import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from "../utils/url";
import order from "../reducers/order";

const Main = () => {
  const orderItems = useSelector((store) => store.order.items);
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
          dispatch(order.actions.setItems(data.response));
          dispatch(order.actions.setError(null));
        } else {
          dispatch(order.actions.setItems([]));
          dispatch(order.actions.setError(data.response));
        }
      });
  }, [accessToken]);

  return (
    <div>
      <h1>Here is your order</h1>
      {orderItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
    </div>
  );
};

export default Main;
