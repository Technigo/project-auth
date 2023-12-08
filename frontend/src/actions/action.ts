import { FormEvent } from "react";
import { USER_SCHEMA } from "../sevices/helpers";

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
