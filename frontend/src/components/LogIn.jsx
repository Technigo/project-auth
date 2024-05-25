import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";
import { useStore } from "../store/useStore";
import { useState } from "react";

export const LogIn = () => {
  const { formData, handleSubmitLogin, handleChange } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await handleSubmitLogin(event);
      // Redirect to /logged-in after successful login
      window.location.href = "/logged-in";
    } catch (error) {
      console.error("Error logging in", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
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
            value={formData.username}
            onChange={(event) => handleChange("username", event.target.value)}
          />

          <TextInput
            label={"Password"}
            inputType={"password"}
            inputName={"password"}
            placeholder={"Type your password"}
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
        </div>
        <Button type={"submit"} btnText={"Log in"} disabled={isLoading} />
      </form>
    </>
  );
};
