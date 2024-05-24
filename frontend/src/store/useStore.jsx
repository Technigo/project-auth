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
    accessToken: "",
    message: "",
  },

  handleSubmitForm: async (event) => {
    event.preventDefault();
    const { formData } = get();
    const constructedAddress =
      formData.street + formData.postCode + formData.city;

    if (formData.password !== formData.verifyingPassword) {
      console.error("Passwords do not match");
      return;
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
      console.log(result);
      set((state) => ({
        formData: {
          ...state.formData,
          accessToken: result.accessToken,
        },
      }));
      //const updatedFormData = get().formData;
      //console.log(updatedFormData.accessToken);
    } catch (error) {
      console.error("Error adding new user:", error);
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
        formData: {
          ...state.formData,
          accessToken: result.accessToken,
        },
      }));
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
      set((state) => ({
        formData: {
          ...state.formData,
          message: result.message,
        },
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
