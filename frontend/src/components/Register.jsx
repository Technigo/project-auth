import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";

export const Register = () => {
  return (
    <form>
      <div className="title-box">
        <Headline titleText={"Register"} />
        <div className="text-box">
          <p>Love to read and want to meet fellow book enthusiasts?</p>
          <p>
            Register now for our OMC Book Club and dive into lively discussions, discover new genres, and share your
            favorite reads!
          </p>
        </div>
      </div>

      <TextInput label={"First name"} inputType={"text"} inputName={"firstname"} placeholder={"Type your first name"} />

      <TextInput label={"Last name"} inputType={"text"} inputName={"lastname"} placeholder={"Type your last name"} />

      <TextInput label={"E-mail"} inputType={"email"} inputName={"email"} placeholder={"Type your e-mail"} />

      <fieldset>
        <legend>Address</legend>
        <TextInput label={"Street"} inputType={"text"} inputName={"street"} placeholder={"Type your street"} />

        <div className="input-tablet-desktop">
          <div className="postcode-box">
            <TextInput label={"Post code"} inputType={"text"} inputName={"postcode"} placeholder={"xxx xx"} />
          </div>

          <div className="city-box">
            <TextInput label={"City"} inputType={"text"} inputName={"city"} placeholder={"Type your city"} />
          </div>
        </div>
      </fieldset>

      <TextInput label={"Username"} inputType={"text"} inputName={"username"} placeholder={"Type your username"} />

      <TextInput label={"password"} inputType={"password"} inputName={"password"} placeholder={"Type your password"} />

      <Button btnText={"Sign up"} />
    </form>
  );
};
