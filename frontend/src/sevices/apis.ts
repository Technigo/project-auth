import { CreateUser } from "../types/formType";

export const createUser = async (formData: CreateUser) => {
  try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status !== 201) throw new Error();

    return res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUser = async () => {
  try {
    const res = await fetch("", {
      method: "POST",
    });

    if (res.status !== 201) throw new Error();

    return res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const logOutUser = async () => {
  try {
    const res = await fetch("", {
      method: "POST",
    });

    if (res.status !== 201) throw new Error();

    return res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
