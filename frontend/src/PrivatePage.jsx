import { useEffect, useState } from "react";

export const PrivatePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/private")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);

  return <div>{data}</div>;
};
