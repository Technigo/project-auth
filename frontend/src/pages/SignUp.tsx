import { FormControl, FormLabel, Input } from "@mui/joy";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { submitForm } from "../actions/action";
import { FormEvent, useState } from "react";
import { createUser } from "../sevices/apis";
import { FormError } from "../types/formType";

const initialState = {
  name: { error: false, message: "" },
  email: { error: false, message: "" },
  password: { error: false, message: "" },
  passwordConfirm: { error: false, message: "" },
};

export const SignUp = () => {
  const [formError, setFormError] = useState<FormError>(initialState);

  const hanldleSubmit = (e: FormEvent<HTMLFormElement> | undefined) => {
    const result = submitForm(e);
    let userObj;
    if (!result.success) {
      result.error.issues.map((issue, index) => {
        const key = issue.path[0];
        Object.hasOwn(formError, key)
          ? setFormError((prev) => ({ [key]: { error: true, message: issue.message }, ...prev }))
          : "";
      });
    } else {
      const data = result;
      userObj = {
        name: data.data.name,
        email: data.data.email,
        password: data.data.passwords.password,
        passwordConfirm: data.data.passwords.passwordConfirm,
      };
    }

    userObj && createUser(userObj);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-green-800">Saku TODO 🌸</h1>
      <div className="w-[300px] sm:w-[500px] mx-auto pt-10">
        <h2 className="text-2xl font-bold text-teal-900 text-center mb-4">Sign Up</h2>
        <form className="w-96 sm:w-full" onSubmit={hanldleSubmit}>
          <FormControl id="name" error={formError.name.error}>
            <FormLabel required={true}>Name</FormLabel>
            <Input name="name" placeholder="Harry Potter" className="p-2 mb-4 " />
          </FormControl>
          <FormControl id="email" error={formError.email.error}>
            <FormLabel required={true}>Email</FormLabel>
            <Input name="email" placeholder="harry@hogwarts.ed" className="p-2 mb-4" />
          </FormControl>
          <FormControl id="password" error={formError.password.error}>
            <FormLabel required={true}>Password</FormLabel>
            <Input name="password" placeholder="password..." className="p-2 mb-4" />
          </FormControl>
          <FormControl id="passwordConfirm" error={formError.passwordConfirm.error}>
            <FormLabel required={true}>Confirm Password</FormLabel>
            <Input name="passwordConfirm" placeholder="password..." className="p-2 mb-4" />
          </FormControl>
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Submit" icon={true} />
          </div>
        </form>
      </div>
    </div>
  );
};
