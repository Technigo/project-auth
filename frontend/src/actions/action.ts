import { FormEvent } from "react";
import { USER_SCHEMA } from "../sevices/helpers";

export const submitForm = (event: FormEvent<HTMLFormElement> | undefined) => {
  event?.preventDefault();

  const formData = new FormData(event?.currentTarget);
  const formJson = Object.fromEntries((formData as any).entries());

  let newFormData: { [key: string]: any } = {};

  Object.keys(formJson).forEach((inputKey) => {
    if (inputKey !== "password" && inputKey !== "passwordConfirm") {
      const value = formData.get(inputKey) as FormDataEntryValue;
      newFormData[inputKey] = value;
    }
  });

  newFormData["passwords"] = {
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = USER_SCHEMA.safeParse(newFormData);

  return result;
};
