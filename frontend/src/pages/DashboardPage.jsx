import { useState, useEffect } from "react";

export const DashboardPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setMessage("You don't have access to this page. Please log in first.");
        return;
      }

      try {
        const response = await fetch(
          "https://project-authentication-6r12.onrender.com/dashboard",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to log into your dashboard. Please try again."
          );
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error("Failed to fetch dashboard info:", err);
        setMessage("Failed to log into your dashboard. Please try again.");
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <section>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.href = "/";
        }}
      >
        Log Out
      </button>
    </section>
  );
};
