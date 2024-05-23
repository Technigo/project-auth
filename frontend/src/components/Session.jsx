import { useEffect, useState } from "react";

export const Session = ({ accessToken }) => {
  const [message, setMessage] = useState("");

  const fetchData = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8080/logged-in", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData(accessToken);
    }
  }, []);

  return <div>Session: You are logged in. {message}</div>;
};
