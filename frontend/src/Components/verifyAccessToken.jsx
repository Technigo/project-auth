export const VerifyAccessToken = ({ isLoggedIn, setIsLoggedIn }) => {
  // Function to retrieve the access token from local storage

  const getAccessToken = () => {
    console.log(localStorage.getItem("access_token"));
    return localStorage.getItem("access_token");
  };

  if (
    getAccessToken() &&
    getAccessToken() === !undefined &&
    getAccessToken() === !null
  ) {
    console.log("FOUND ACCESS TOKEN");
    setIsLoggedIn(true);
  } else {
    console.log("found nothing... sadness devours me...", getAccessToken());
    setIsLoggedIn(false);
  }
  console.log(getAccessToken());
  console.log("Verified access token: ", isLoggedIn);

  return <>{isLoggedIn ? `Hej You!` : null}</>;
};
