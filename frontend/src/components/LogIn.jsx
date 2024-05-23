import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";

export const LogIn = () => {
  return (
    <form>
      <div className="title-box">
        <Headline titleText={"Log in"} />
        <div className="text-box">
          <p>Welcome back, let the literary adventures continue!</p>
        </div>
      </div>
      <div className="input-tablet-desktop">
        <TextInput label={"Username"} inputType={"text"} inputName={"username"} placeholder={"Type your username"} />

        <TextInput
          label={"Password"}
          inputType={"password"}
          inputName={"password"}
          placeholder={"Type your password"}
        />
      </div>
      <Button btnText={"Log in"} />
    </form>
  );
};
