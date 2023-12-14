// Import the necessary module for state management
import { create } from "zustand";
// Import the userStore to access user-related data
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing ads
export const adStore = create((set) => ({
  // Initialize the ad state with an empty array
  ads: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Define an action to add an AD to the state
  addAd: (newAd) => set((state) => ({ ads: [...state.ads, newAd] })),

  // Define an action to set the ads state to a new array of ads
  setads: (ads) => set({ ads }),

  // New action to delete all ads
  deleteAllAds: async () => {
    try {
      // Send a DELETE request to the backend API to delete all ads
      const response = await fetch(`${apiEnv}/deleteAll`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Clear the ads in the state
        set({ ads: [] });
      } else {
        console.error("Failed to delete ads");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to fetch ads
  fetchAds: async () => {
    try {
      // Send a GET request to the backend API to fetch ads
      const response = await fetch(`${apiEnv}/get`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data and set it as the ads state
        const data = await response.json();
        set({ ads: data });
      } else {
        console.error("Failed to fetch ads");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to add an ad to the server and then to the store
  addAdToServer: async (ad) => {
    try {
      // Send a POST request to the backend API to add a new ad
      const response = await fetch(`${apiEnv}/add`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ad: ad }),
      });
      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Add the new ad to the ads state
        set((state) => ({ ads: [...state.ads, data] }));
      } else {
        console.error("Failed to add ad");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to update the boolean isSold value in the store
  handleEdit: async (id) => {
    try {
      // Send a PUT request to the backend API to update an ad by its ID
      const response = await fetch(`${apiEnv}/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      // Parse the updated ad data
      const updatedAd = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Update the ad in the ads state
        set((state) => ({
          ads: state.ads.map((ad) =>
            ad._id === id ? { ...ad, ...updatedAd } : ad
          ),
        }));
      } else {
        console.error("Failed to update the ad");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to delete a specific ad by its ID
  deleteAdById: async (id) => {
    try {
      // Send a DELETE request to the backend API to delete an ad by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      // Check if the request was successful
      if (response.ok) {
        // Remove the ad from the ads state
        set((state) => ({
          ads: state.ads.filter((ad) => ad._id !== id),
        }));
      } else {
        console.error("Failed to delete ad");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  },
}));
