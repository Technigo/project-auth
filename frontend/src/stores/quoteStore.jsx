import { create } from "zustand";
import { userStore } from "./userStore";

/* const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv); */

export const quoteStore = create((set) => ({
    quotes: [],
    addQuote: (newQuote) => set((state) => ({ quotes: [...state.quotes, newQuote] })),
    setQuotes: (qus) => set({ dogs }),

    // Fetch the dogs a specific user has added in their profile
    fetchDogs: async () => {
        try {
            const response = await fetch('https://rescue-helper.onrender.com/yourDogs', {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            if (response.ok) {
                const data = await response.json();
                set({ dogs: data });
            } else {
                console.error("Failed to fetch your dogs");
            }
        } catch (error) {
            console.error(error);
        }
    }
}))