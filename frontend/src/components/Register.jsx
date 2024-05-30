import { useStore } from "../store/useStore";
import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";
import { useState } from "react";

export const Register = () => {
  const { signUpData, handleSubmitForm, handleSignUpChange } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const success = await handleSubmitForm(event);
    if (success) {
      window.location.href = "/logged-in";
    } else {
      console.error("Error logging in");
      setPasswordError(true);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="title-box">
        <Headline titleText={"Register"} />
        <div className="text-box">
          <p>Love to read and want to meet fellow book enthusiasts?</p>
          <p>
            Register now for our OMC Book Club and dive into lively discussions,
            discover new genres, and share your favorite reads!
          </p>
        </div>
      </div>
      <TextInput
        label={"Full name"}
        inputType={"text"}
        inputName={"fullname"}
        placeholder={"Type your full name"}
        value={signUpData.name}
        onChange={(event) => handleSignUpChange("name", event.target.value)}
      />
      <TextInput
        label={"E-mail"}
        inputType={"email"}
        inputName={"email"}
        placeholder={"Type your e-mail"}
        value={signUpData.email}
        onChange={(event) => handleSignUpChange("email", event.target.value)}
      />
      <fieldset>
        <legend>Address</legend>
        <TextInput
          label={"Street"}
          inputType={"text"}
          inputName={"street"}
          placeholder={"Type your street"}
          value={signUpData.street}
          onChange={(event) => handleSignUpChange("street", event.target.value)}
        />

        <div className="input-tablet-desktop">
          <div className="postcode-box">
            <TextInput
              label={"Post code"}
              inputType={"text"}
              inputName={"postcode"}
              placeholder={"xxx xx"}
              value={signUpData.postCode.toString()}
              onChange={(event) =>
                handleSignUpChange("postCode", event.target.value)
              }
            />
          </div>

          <div className="city-box">
            <TextInput
              label={"City"}
              inputType={"text"}
              inputName={"city"}
              placeholder={"Type your city"}
              value={signUpData.city}
              onChange={(event) =>
                handleSignUpChange("city", event.target.value)
              }
            />
          </div>
        </div>
      </fieldset>
      <TextInput
        label={"Username"}
        inputType={"text"}
        inputName={"username"}
        placeholder={"Type your username"}
        value={signUpData.username}
        onChange={(event) => handleSignUpChange("username", event.target.value)}
      />
      <TextInput
        label={"Password"}
        inputType={"password"}
        inputName={"password"}
        placeholder={"Type your password"}
        value={signUpData.password}
        onChange={(event) => handleSignUpChange("password", event.target.value)}
      />
      <TextInput
        label={"Verifying password"}
        inputType={"password"}
        inputName={"verifyingPassword"}
        placeholder={"Re-enter your password"}
        value={signUpData.verifyingPassword}
        onChange={(event) =>
          handleSignUpChange("verifyingPassword", event.target.value)
        }
      />
      {passwordError && <p>Passwords do not match</p>}
      <Button type={"submit"} btnText={"Sign up"} disabled={isLoading} />
    </form>
  );
};
