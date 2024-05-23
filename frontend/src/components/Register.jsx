import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";
import { useState } from "react";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [address, setAddress] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // const [formData, setFormData] = useState({
  //   fullname: "",
  //   email: "",
  //   street: "",
  //   postcode: "",
  //   city: "",
  //   username: "",
  //   password: "",
  //   verifyingPassword: ""
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //    ...prevData,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== verifyPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Construct the address directly here
    const constructedAddress = street + postCode + city;

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
          address: constructedAddress,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextInput
        label={"E-mail"}
        inputType={"email"}
        inputName={"email"}
        placeholder={"Type your e-mail"}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <fieldset>
        <legend>Address</legend>
        <TextInput
          label={"Street"}
          inputType={"text"}
          inputName={"street"}
          placeholder={"Type your street"}
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />

        <div className="input-tablet-desktop">
          <div className="postcode-box">
            <TextInput
              label={"Post code"}
              inputType={"text"}
              inputName={"postcode"}
              placeholder={"xxx xx"}
              value={postCode.toString()}
              onChange={(event) => setPostCode(event.target.value)}
            />
          </div>

          <div className="city-box">
            <TextInput
              label={"City"}
              inputType={"text"}
              inputName={"city"}
              placeholder={"Type your city"}
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
      </fieldset>

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

      <TextInput
        label={"Verifying password"}
        inputType={"password"}
        inputName={"verifyingPassword"}
        placeholder={"Type your password"}
        value={verifyPassword}
        onChange={(event) => setVerifyPassword(event.target.value)}
      />

      <Button btnText={"Sign up"} />
    </form>
  );
};
