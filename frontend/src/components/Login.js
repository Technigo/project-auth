import React from "react";
import { useDispatch, /*useSelector*/  } from 'react-redux';

const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    // const userStart = useSelector((store) => store.user.username)

  /* const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  }; */

  const onFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="form-container-login" onSubmit={onFormSubmit}>
         <label htmlFor="username">Username: </label>
      <input
        type="text"
        placeholder="🖊️ Write your username here"
        value={username}
        onChange={(e) => handleChange(e)}
        className="input" />
        <label htmlFor="password">Password: </label>
        <input
        type="text"
        placeholder="🖊️ Write your password here"
        value={password}
        onChange={(e) => handleChange(e)}
        className="input" />
      <button className="submit-btn" type="submit">Submit</button>
    </form>
    )
};

export default Login;