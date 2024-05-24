import { useStore } from "../store/useStore";
import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";

export const Register = () => {
  const { formData, handleSubmitForm, handleChange } = useStore();

  return (
    <form onSubmit={handleSubmitForm}>
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
        value={formData.name}
        onChange={(event) => handleChange("name", event.target.value)}
      />
      <TextInput
        label={"E-mail"}
        inputType={"email"}
        inputName={"email"}
        placeholder={"Type your e-mail"}
        value={formData.email}
        onChange={(event) => handleChange("email", event.target.value)}
      />

      <fieldset>
        <legend>Address</legend>
        <TextInput
          label={"Street"}
          inputType={"text"}
          inputName={"street"}
          placeholder={"Type your street"}
          value={formData.street}
          onChange={(event) => handleChange("street", event.target.value)}
        />

        <div className="input-tablet-desktop">
          <div className="postcode-box">
            <TextInput
              label={"Post code"}
              inputType={"text"}
              inputName={"postcode"}
              placeholder={"xxx xx"}
              value={formData.postCode.toString()}
              onChange={(event) => handleChange("postCode", event.target.value)}
            />
          </div>

          <div className="city-box">
            <TextInput
              label={"City"}
              inputType={"text"}
              inputName={"city"}
              placeholder={"Type your city"}
              value={formData.city}
              onChange={(event) => handleChange("city", event.target.value)}
            />
          </div>
        </div>
      </fieldset>

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

      <TextInput
        label={"Verifying password"}
        inputType={"password"}
        inputName={"verifyingPassword"}
        placeholder={"Type your password"}
        value={formData.verifyingPassword}
        onChange={(event) =>
          handleChange("verifyingPassword", event.target.value)
        }
      />

      <Button type={"submit"} btnText={"Sign up"} />
    </form>
  );
};
