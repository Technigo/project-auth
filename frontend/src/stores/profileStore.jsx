import { create } from "zustand";
const apiEnv = import.meta.env.VITE_BACKEND_API;
// import { userStore } from "../stores/userStore";

export const profileStore = create((set) => ({
  //  set the initial data
  lastName: "",
  setLastName: (lastName) => set({ lastName }),
  firstName: "",
  setFirstName: (firstName) => set({ firstName }),
  phone: "",
  setPhone: (phone) => set({ phone }),
  important: "",
  setImportant: (important) => set({ important }),
  color: "",
  setColor: (color) => set({ color }),
  flower: "",
  setFlower: (flower) => set({ flower }),

  handleAddprofile: async () => {
    if (!lastName || !firstName || !phone) {
      alert("Please enter last name, first name and phone");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/profile`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          important,
          flower,
          color,
        }),
      });

      const data = await response.json();

      if (data.success) {
        set({ firstName, lastName, phone, important, flower, color });
        // Redirect or update UI
        alert("Adding profile successful!");
      } else {
        // Display error message from server
        alert(data.response || "Adding profile not successful!");
      }
    } catch (error) {
      console.error("Add profile error:", error);
      alert("An error occurred during add profile process.");
    }
  },
  handleUpdateprofile: async () => {
    if (!lastName || !firstName || !phone) {
      alert("Please enter last name, first name and phone");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/profile`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          important,
          flower,
          color,
        }),
      });

      const data = await response.json();

      if (data.success) {
        set({ firstName, lastName, phone, important, flower, color });
        // Redirect or update UI
        alert("Updating profile successful!");
      } else {
        // Display error message from server
        alert(data.response || "Updating profile not successful!");
      }
    } catch (error) {
      console.error("Updating profile error:", error);
      alert("An error occurred during add profile process.");
    }
  },
}));
