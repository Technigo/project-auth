import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import { API_BASE } from "../utils/constants.js";

// Styled components
const StyledImage = styled.img`
  width: 400px;
`;

const StyledButton = styled.button`
  width: auto;
  height: 40px;
  padding: 10px;
  background-color: #0066cc;
  color: white;
  border-radius: 4px;
  border: none;
`;

export const Main = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

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

    fetch(API_BASE, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImage(data.response.image);
        }
      });
  }, [accessToken]);

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setError(null));
    });
  };

  return (
    <>
      <StyledImage src={image} alt="programmers brain" />
      <StyledButton onClick={() => logout()}>Log out</StyledButton>
    </>
  );
};
