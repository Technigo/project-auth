import { create } from "zustand";

export const useStore = create((set, get) => ({
  formData: {
    name: "",
    email: "",
    street: "",
    postCode: "",
    city: "",
    username: "",
    password: "",
    verifyingPassword: "",
  },
  accessToken: "",
  message: "",

  resetState: () =>
    set({
      formData: {
        name: "",
        email: "",
        street: "",
        postCode: "",
        city: "",
        username: "",
        password: "",
        verifyingPassword: "",
      },
      accessToken: "",
      message: "",
    }),

  handleSubmitForm: async (event) => {
    event.preventDefault();
    const { formData } = get();
    const constructedAddress =
      formData.street + formData.postCode + formData.city;

    if (formData.password !== formData.verifyingPassword) {
      console.error("Passwords do not match");
      return false;
    }
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
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
      const updatedUsername = get().formData.username;
      localStorage.setItem("token", JSON.stringify(updatedAccessToken));
      localStorage.setItem("username", JSON.stringify(updatedUsername));
      return true;
    } catch (error) {
      console.error("Error adding new user:", error);
      return false;
    }
  },

  handleChange: (fieldName, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [fieldName]: value,
      },
    }));
  },

  handleSubmitLogin: async (event) => {
    event.preventDefault();
    const { formData } = get();
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
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
      const updatedUsername = get().formData.username;
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
