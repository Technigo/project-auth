import { useEffect, useState } from "react";

export const Secrets = () => {
  // const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   const fetchSecrets = async () => {
  //     try {
  //       const data = await fetch("http://localhost:8080/secrets");
  //       const secrets = await data.json();
  //       console.log(secrets);
  //       setUserData(secrets);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchSecrets();
  // }, []);

  return (
    <>
      {/* {userData ? ( */}
      <div>
        <h2>Your account information</h2>
        <ul>
          <li>ID: { }</li>
          <li>Username: </li>
          <li>Access Token: </li>
        </ul>
      </div>
    </>
  );
};
