import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  Container, 
  Button,  
  Text 
} from "@chakra-ui/react"

import user from "reducers/user";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  return (
    <Container>
      <Text fontSize='3xl'>Grab a Beer</Text>
      <Button
        type="button"
        onClick={() => {
          navigate("/login");
          dispatch(user.actions.setAccessToken(null));
        }}
      >
        Log out
      </Button>
    </Container>
  );
};

export default Main;