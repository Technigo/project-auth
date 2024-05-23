import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";
import { useState } from "react";

export const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="title-box">
        <Headline titleText={"Log in"} />
        <div className="text-box">
          <p>Welcome back, let the literary adventures continue!</p>
        </div>
      </div>
      <div className="input-tablet-desktop">
        <TextInput
          label={"Username"}
          inputType={"text"}
          inputName={"username"}
          placeholder={"Type your username"}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextInput
          label={"Password"}
          inputType={"password"}
          inputName={"password"}
          placeholder={"Type your password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button btnText={"Log in"} />
    </form>
    </>
  );
};
