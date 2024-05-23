import { useEffect } from "react";

export const Secrets = () => {
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const data = await fetch("localhost:8080/secrets");
        const secrets = await data.json();
        console.log(secrets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSecrets();
  }, []);

  return <div>Here is your secrets</div>;
};
