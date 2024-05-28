import { useEffect, useState } from "react";

export const PrivatePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/private", {
      headers: {
        // this is how we get the token back from the local storage, to prove that the user is still logged in.   
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);

  return <div>{data}</div>;
};
