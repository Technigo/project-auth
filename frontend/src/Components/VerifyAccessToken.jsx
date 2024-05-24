import { Form } from "./Form";

export const verifyAccessToken = ({ isLoggedIn, setIsLoggedIn }) => {
  if (
    Form.getAccessToken() &&
    Form.getAccessToken() === !undefined &&
    Form.getAccessToken() === !null
  ) {
    console.log("FOUND ACCESS TOKEN");
    setIsLoggedIn(true);
  } else {
    console.log("found nothing... sadness devours me...", Form.getAccessToken());
    setIsLoggedIn(false);
  }
  console.log(Form.getAccessToken());
  console.log("Verified access token: ", isLoggedIn);

  return isLoggedIn;
};
