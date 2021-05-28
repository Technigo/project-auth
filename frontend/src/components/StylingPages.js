import styled, { keyframes } from "styled-components";

// MAIN PAGE
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 100%;
  margin: 0;
  position: fixed;
  top: 0;
  @media (min-width: 768px) {
    height: 100vh;
    margin-bottom: 80px;
    flex-direction: row;
    height: 60%;
    width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

// MAIN PAGE - Joke side
export const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  background-color: #f780b1;
  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
    border-bottom: none;
  }
`;

export const Header = styled.h1`
  font-size: 22px;
  text-align: center;
  color: white;
  padding: 0 20px;
  @media (min-width: 1200px) {
    font-size: 26px;
  }
`;

export const Button = styled.button`
  padding: 15px 30px;
  width: 100%;
  border-radius: 40px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #fff;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  font-family: "Padauk", sans-serif;
  letter-spacing: 1.5px;
  margin-top: 20px;
  :hover,
  :focus {
    color: #f780b1;
    background-color: #f2f3ff;
  }
`;

// MAIN PAGE - Message side
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 50%;
  align-items: center;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

export const ReceivedMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #f780b1;
  @media (min-width: 768px) {
    padding: 20px 0;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
  color: #83868e;
  padding-top: 10px;
`;

const heart = keyframes`
  from { transform: translateY(-10px) }
  to { transform: translateY(10px) }
`;

export const Heart = styled.span`
  color: #f780b1;
  font-size: 20px;
  position: absolute;
  bottom: 5px;
  top: 0;
  left: 10px;
  right: 0;
  animation: ${heart} 1s linear infinite alternate-reverse;
`;

export const MessageTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #6970f7;
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

export const Message = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: #83868e;
  @media (min-width: 1200px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;

// MAIN PAGE - Form area
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (min-width: 768px) {
    padding: 20px 0;
  }
`;

export const InputMessage = styled.textarea`
  border: 1px solid #f780b1;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
  background-color: #f2f3ff;
  ::placeholder {
    color: #f780b1;
    opacity: 1;
  }
  :focus {
    border: 2px solid #f780b1;
  }
  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const MessageButton = styled.button`
  outline: none;
  background-color: #6970f7;
  padding: 5px 10px 3px 10px;
  font-size: 14px;
  color: white;
  border: 2px solid #6970f7;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Padauk", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  :hover,
  :focus {
    color: #6970f7;
    background-color: #f2f3ff;
  }
`;

export const SentMessageText = styled.p`
  font-size: 14px;
  color: #6970f7;
  margin: 0;
  font-weight: 600;
`;

// JOKE PAGE
export const Logo = styled.img`
  width: 20%;
  margin: 10px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
    width: 120px;
  }
  @media (min-width: 1200px) {
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  width: 90%;
  margin-bottom: 100px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media (min-width: 768px) {
    flex-direction: column;
    // height: 70%;
    max-width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

export const JokeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 75%;
  @media (min-width: 768px) {
    height: 60%;
  }
`;

export const Setup = styled.h1`
  margin-bottom: 10px;
  text-align: center;
  line-height: 25px;
  font-size: 22px;
  color: #e56d6b;
`;

export const Punchline = styled.h3`
  margin: 0px;
  font-weight: 400;
  color: #83868e;
  text-align: center;
  padding-bottom: 20px;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

// SIGNIN AND SIGNUP PAGES
export const SignInUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 60%;
    max-width: 70%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

export const FormContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  align-items: center;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

export const SignInUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const SignInLogo = styled.img`
  background-image: url(./assets/logo.png);
  width: 50%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 12px;
  position: absolute;
  bottom: 35%;
`;

export const EyeButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #6c6c6d;
  position: absolute;
  right: 0;
  bottom: 59%;
  :hover {
    opacity: 0.8;
  }
`;

export const FormImageContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const FormImage = styled.img`
  object-fit: cover;
  width: 100%;
`;

// SIGNUP PAGE only
export const CreateAccount = styled.h1`
  font-weight: 500;
  font-size: 23px;
  color: #83868e;
  font-family: "Roboto";
  margin-bottom: 40px;
`;

export const ErrorMessageSignUp = styled.p`
  color: red;
  padding-top: 10px;
  font-size: 12px;
  margin: 0;
  position: absolute;
  bottom: 25%;
  @media (min-width: 768px) {
    padding-top: 15px;
    bottom: 27%;
  }
`;

export const EyeButtonSignUp = styled(EyeButton)`
  bottom: 36%;
`;
