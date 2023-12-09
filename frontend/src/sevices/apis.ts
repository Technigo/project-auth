import { ADD_GIF_API, CREATE_USER_API, LOGIN_USER_API } from "../statics/apis";
import { CreateUser, LoginBody } from "../types/formType";
import { StoreGif } from "../types/common";

export const createUser = async (formData: CreateUser) => {
  try {
    const res = await fetch(CREATE_USER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.status === 201) {
      localStorage.setItem("accessToken", data.accessToken);
      alert("Created a new User");
      return data;
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUser = async (formData: LoginBody) => {
  try {
    const res = await fetch(LOGIN_USER_API, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const storeGif = async (body: StoreGif) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(ADD_GIF_API, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const newGif = await res.json();

    return newGif;
  } catch (err) {
    return err;
  }
};

export const getGifs = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return alert("Please check in first");
  try {
    const res = await fetch(ADD_GIF_API, {
      method: "Get",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    const gifs = await res.json();
    console.log(gifs);

    return gifs;
  } catch (err) {
    return err;
  }
};
