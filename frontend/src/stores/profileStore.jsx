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

  //  add profile
  // handleAddProfile: async (formData) => {
  //   if (!lastName || !firstName || !phone) {
  //     alert("Please enter last name, first name, and phone");
  //     return;
  //   }
  //   const id = userStore.getState().id;
  //   console.log(id);

  //   try {
  //     const response = await fetch(`${apiEnv}/profile/${id}`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       set((state) => ({
  //         ...state,
  //         firstName,
  //         lastName,
  //         phone,
  //         color,
  //         flower,
  //         important,
  //         imageUrl,
  //       }));

  //       alert("Add profile successful!");
  //     } else {
  //       console.log(data.response);
  //     }
  //   } catch (error) {
  //     console.error("Add profile error:", error);
  //     alert("An error occurred during adding profile process");
  //   }
  // },

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
        // console.log(data.response || "Fetch profile not successful!");
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

      console.log("Fetch profile successful!");
    } catch (error) {
      console.error("Fetch profile error", error);
    }
  },
  // update a profile
  // handleUpdateProfile: async (formData) => {
  //   const id = userStore.getState().id;
  //   console.log(id);
  //   try {
  //     const response = await fetch(`${apiEnv}/profile/${id}`, {
  //       method: "PUT", // Use PUT for updating
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         // "Content-Type": "multipart/form-data",
  //       },
  //       // body: JSON.stringify({
  //       //   firstName,
  //       //   lastName,
  //       //   phone,
  //       //   color,
  //       //   flower,
  //       //   important,
  //       //   imageUrl,
  //       // }),
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       set((state) => ({
  //         ...state,
  //         firstName: data.response.firstName,
  //         lastName: data.response.lastName,
  //         phone: data.response.phone,
  //         color: data.response.color,
  //         flower: data.response.flower,
  //         important: data.response.important,
  //         image: data.response.image,
  //       }));

  //       console.log("Update profile successful!");
  //     } else {
  //       console.log(data.response || "Update profile not successful!");
  //     }
  //   } catch (error) {
  //     console.error("Update profile error", error);
  //     alert("An error occurred during updating the profile.");
  //   }
  // },
}));
