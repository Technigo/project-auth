import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailsButton = ({ SIGNUP_URL }) => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const history = useHistory();

  const [validate, checkValidate] = useState(false)
  const [result, setResult] = useState({})

  const loginSuccess = (loginResponse) => {
    checkValidate(prev => !prev);
    setResult(loginResponse);
    history.push("/userdetails");
  };

  const loginFailed = (loginError) => {
    console.log(loginError)
  };

  const handleClick = () => {
    fetch(`${SIGNUP_URL}/${userId}/profile`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line
          throw 'Failed to retrieve secret';
        }
        return res.json();
      })
      // SUCCESS: Do something with the information we got back
      .then((json) => loginSuccess(json))
      .catch((err) => loginFailed(err)); //401
  }

  return (
    <div> { accessToken &&
      //<Link to={`/users/${userId}`}>
      <button type="submit" onClick={handleClick}>User Details</button>
      //</Link>
    } <div>{validate && `Email:${result.email},ID:${result.userId}, accessToken:${result.accessToken}`}</div>
    </div>
  )
}

export default DetailsButton;