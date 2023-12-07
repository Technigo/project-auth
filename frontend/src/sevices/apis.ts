import { CREATE_USER_API, DELETE_USER_API, LOGIN_USER_API, UPDATE_USER_API } from "../statics/apis";
import { CreateUser, UpdateUserBody, UserRes } from "../types/formType";

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
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      alert("Created a new User");
      return data;
    } else {
      console.log(data);
      return data;
    }
  } catch (err) {
    console.error(err);

    return err;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(LOGIN_USER_API, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.status !== 200) throw new Error();
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(DELETE_USER_API(id), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status !== 200) throw new Error();
    localStorage.removeItem("accessToken");
    return res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateUser = async (id: string, body: UpdateUserBody) => {
  try {
    const res = await fetch(UPDATE_USER_API(id), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status !== 200) throw new Error();
    return res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
