import { create } from "zustand";

export const useStore = create((set, get) => ({
  signUpData: {
    name: "",
    email: "",
    street: "",
    postCode: "",
    city: "",
    username: "",
    password: "",
    verifyingPassword: "",
  },

  loginData: {
    username: "",
    password: "",
  },

  accessToken: "",
  message: "",

  resetSignUpData: () =>
    set({
      signUpData: {
        name: "",
        email: "",
        street: "",
        postCode: "",
        city: "",
        username: "",
        password: "",
        verifyingPassword: "",
      },
    }),

  resetLoginData: () =>
    set({
      loginData: {
        username: "",
        password: "",
      },
    }),

  handleSubmitForm: async (event) => {
    event.preventDefault();
    const { signUpData } = get();
    const constructedAddress =
      signUpData.street + signUpData.postCode + signUpData.city;

    if (signUpData.password !== signUpData.verifyingPassword) {
      console.error("Passwords do not match");
      return false;
    }
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({
          name: signUpData.name,
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          address: constructedAddress,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      set((state) => ({ ...state, accessToken: result.accessToken }));
      const updatedAccessToken = get().accessToken;
      const updatedUsername = get().signUpData.username;
      localStorage.setItem("token", JSON.stringify(updatedAccessToken));
      localStorage.setItem("username", JSON.stringify(updatedUsername));
      return true;
    } catch (error) {
      console.error("Error adding new user:", error);
      return false;
    }
  },

  handleSignUpChange: (fieldName, value) => {
    set((state) => ({
      signUpData: {
        ...state.signUpData,
        [fieldName]: value,
      },
    }));
  },

  handleLoginChange: (fieldName, value) => {
    set((state) => ({
      loginData: {
        ...state.loginData,
        [fieldName]: value,
      },
    }));
  },

  handleSubmitLogin: async (event) => {
    event.preventDefault();
    const { loginData } = get();
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      set((state) => ({
        ...state,
        accessToken: result.accessToken,
      }));
      const updatedAccessToken = get().accessToken;
      const updatedUsername = get().loginData.username;
      localStorage.setItem("token", JSON.stringify(updatedAccessToken));
      localStorage.setItem("username", JSON.stringify(updatedUsername));
    } catch (error) {
      console.error("Error logging in", error);
    }
  },

  fetchLoggedInData: async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8080/logged-in", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      set((state) => ({ ...state, message: result.message }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
