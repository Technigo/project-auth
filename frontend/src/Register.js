import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "./services/authorization";
import {
  Body,
  RegTop,
  RegLeft,
  RegRight,
  Image,
  Error,
  FullButton,
  TransparentButton,
  Label,
  Input,
  Container,
  WhiteBackgroundHeader
} from "./styles";
import woman from "./images/woman.jpg";

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState(false);
  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();
    const response = await registerUser(name, email, password);
    if (response.success && name && email && password) {
      history.push("/login");
      console.log("success");
      return;
    }
    setErrorText(true);
    console.log("error");
  };

  return (
    <Body>
      <Container>
        <RegLeft>
          <Image src={woman} />
          <RegTop>
            <h2>One of us?</h2>
            <p>
              If you already have an account, just sign in. We have missed you!
            </p>
          </RegTop>
          <TransparentButton onClick={() => history.push("/login")}>
            SIGN IN
          </TransparentButton>
        </RegLeft>
        <RegRight>
          <WhiteBackgroundHeader>
            Register with us, let´s travel together:
          </WhiteBackgroundHeader>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          ></Input>

          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          ></Input>

          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          ></Input>

          <FullButton onClick={event => handleRegister(event)}>
            REGISTER
          </FullButton>
          {errorText && <Error>Could not add user. Please try again!</Error>}
        </RegRight>
      </Container>
    </Body>
  );
};
