import { create } from "zustand";
const apiEnv = import.meta.env.VITE_BACKEND_API;
import { userStore } from "../stores/userStore";

export const profileStore = create((set) => ({
  // Set the initial data
  lastName: "",
  setLastName: (lastName) => set({ lastName }),
  firstName: "",
  setFirstName: (firstName) => set({ firstName }),
  phone: null,
  setPhone: (phone) => set({ phone }),
  color: "",
  setColor: (color) => set({ color }),
  flower: "",
  setFlower: (flower) => set({ flower }),
  important: null,
  setImportant: (important) => set({ important }),
  image: null,
  setImage: (image) => set({ image }),
  userHasProfile: false,
  setUserHasProfile: (userHasProfile) => set({ userHasProfile }),

  //fetch profile
  fetchProfile: async () => {
    const id = userStore.getState().id;
    try {
      const response = await fetch(`${apiEnv}/profile/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        // If fetch data not successfully, return the default value in the profile page
        set({
          firstName: "",
          lastName: "",
          phone: "",
          color: "",
          flower: "",
          important: null,
          image: "https://picsum.photos/id/306/200/200",
        });
        return;
      }

      // Assuming the profile data is returned in data.response
      const profileData = data.response;

      // Update the state with the fetched profile data
      set({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        color: profileData.color,
        flower: profileData.flower,
        important: profileData.important,
        image: profileData.image,
      });
    } catch (error) {
      console.error("Fetch profile error", error);
    }
  },
}));
