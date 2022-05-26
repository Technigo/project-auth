import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "./myPage.module.css";

export default function MyPage({ authService, pageRouter }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    toast.loading("loading the page...", {
      toastId: "page-loader",
      isLoading: true,
    });
    authService
      .myPage()
      .then((data) => {
        toast.dismiss("page-loader");
        toast.success(`Hello, ${data.username}!`);
        setUrl(data.secret);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [authService]);

  const onLogout = () => {
    authService.logout();
    pageRouter();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.blink}>Let's DANCE💃</h2>
      {url && (
        <div className={styles.imgContainer}>
          <iframe
            src={url}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <ToastContainer />
      <button type="button" onClick={onLogout} className={styles.submit}>
        Logout
      </button>
    </div>
  );
}
