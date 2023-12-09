import { FormEvent } from "react";
import { USER_SCHEMA } from "../sevices/helpers";
import { ZodError } from "zod";

export const checkFormIsValid = (event: FormEvent<HTMLFormElement> | undefined) => {
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

export const selectErrorMessage = (result: { success: false; error: ZodError }) => {
  let formError = {
    name: { error: false, message: "" },
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    passwordConfirm: { error: false, message: "" },
  };
  console.log(result);
  result.error.issues.forEach((issue) => {
    const key = issue.path.at(-1);
    if (key === undefined) return;
    console.log(Object.hasOwn(formError, key), formError, key);
    Object.hasOwn(formError, key)
      ? (formError = { ...formError, [key]: { error: true, message: issue.message } })
      : "";
  });
  return formError;
};

const API_KEY = "PCiF89exyOd5S5oBlLZEZNWmrPTiyTy5";

export const getGifs = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
