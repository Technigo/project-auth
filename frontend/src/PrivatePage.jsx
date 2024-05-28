import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PrivatePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/private", {
      headers: {
        // this is how we get the token back from the local storage, to prove that the user is still logged in.
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((data) => {
        setData(data.message);
      });
  }, []);

  // here we create the log out function that removes the token from the local storage
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {/* data is the msg from the server */}
      {data}
      {/* the && is how to write if in jsx, in js we would typ "if (status === 200) <button onClick ... and so on. " */}
      {/* here we are hiding the log out button if the status is not 200. 200 means user is logged in. 401 is unauthorized, (not logged in) */}
      {status === 200 && <button onClick={logout}>Log out</button>}
    </div>
  );
};
